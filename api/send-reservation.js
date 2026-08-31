import nodemailer from 'nodemailer';
import { escapeHtml } from './lib/escape.js';
import { assertAllowedOrigin } from './lib/validate-origin.js';

export const config = {
  region: 'cdg1',
};

const MAX_FIELD = 500;
const MAX_SHORT = 120;

function validateForm(form) {
  if (!form || typeof form !== 'object') return 'Données invalides.';

  const required = [
    'first_name',
    'last_name',
    'phone',
    'pickup_location',
    'dropoff_location',
    'pickup_date',
    'pickup_time',
    'passengers',
  ];

  for (const key of required) {
    const value = form[key];
    if (value == null || String(value).trim() === '') return 'Champs obligatoires manquants.';
  }

  if (String(form.first_name).length > MAX_SHORT || String(form.last_name).length > MAX_SHORT) {
    return 'Données invalides.';
  }
  if (String(form.phone).length > MAX_SHORT) return 'Données invalides.';
  if (String(form.pickup_location).length > MAX_FIELD || String(form.dropoff_location).length > MAX_FIELD) {
    return 'Données invalides.';
  }
  if (form.email && String(form.email).length > MAX_SHORT) return 'Données invalides.';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(form.email).trim())) return 'Email invalide.';
  if (form.message && String(form.message).length > MAX_FIELD) return 'Données invalides.';
  if (form.special_needs && String(form.special_needs).length > MAX_FIELD) return 'Données invalides.';
  const passengers = Number(form.passengers);
  if (!Number.isFinite(passengers) || passengers < 1 || passengers > 20) return 'Données invalides.';

  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!assertAllowedOrigin(req, res)) return;

  const { form, context } = req.body ?? {};
  const validationError = validateForm(form);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  if (!process.env.SMTP_PASSWORD) {
    return res.status(500).json({ error: 'Service temporairement indisponible.' });
  }

  const safe = {
    first_name: escapeHtml(form.first_name),
    last_name: escapeHtml(form.last_name),
    phone: escapeHtml(form.phone),
    email: form.email ? escapeHtml(form.email) : '',
    pickup_location: escapeHtml(form.pickup_location),
    dropoff_location: escapeHtml(form.dropoff_location),
    pickup_date: escapeHtml(form.pickup_date),
    pickup_time: escapeHtml(form.pickup_time),
    passengers: escapeHtml(form.passengers),
    trip_type: form.trip_type === 'aller_retour' ? 'aller_retour' : 'aller_simple',
    message: form.message ? escapeHtml(form.message) : '',
    special_needs: form.special_needs ? escapeHtml(form.special_needs) : '',
  };
  const safeContext = context ? escapeHtml(String(context).slice(0, MAX_SHORT)) : '';

  const transporter = nodemailer.createTransport({
    host: 'srv04.haisoft.net',
    port: 465,
    secure: true,
    auth: {
      user: 'afb@afbtaxis.com',
      pass: process.env.SMTP_PASSWORD,
    }
  });

  const tripType = safe.trip_type === 'aller_retour' ? 'Aller-Retour' : 'Aller simple';
  const passengerCount = Number(form.passengers);
  const year = new Date().getFullYear();

  const generateEmailHtml = (isAdmin) => {
    const badgeBg = isAdmin ? '#fefce8' : '#ecfdf5';
    const badgeColor = isAdmin ? '#a16207' : '#065f46';
    const badgeBorder = isAdmin ? '#fde047' : '#6ee7b7';
    const badgeText = isAdmin ? 'NOUVELLE COURSE' : 'RESERVATION CONFIRMEE';

    return '<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>AFB Taxis</title></head>'
    + '<body style="margin:0;padding:0;background-color:#111111;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">'

    // Outer wrapper
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;"><tr><td align="center" style="padding:30px 15px;">'

    // Container
    + '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);">'

    // === HEADER ===
    + '<tr><td style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 50%,#0a0a0a 100%);padding:40px 30px 35px;text-align:center;">'
    + '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr>'
    + '<td style="vertical-align:middle;padding-right:14px;">'
    + '<div style="width:52px;height:52px;background-color:#facc15;border-radius:14px;text-align:center;line-height:48px;font-size:24px;font-weight:900;color:#111827;">A</div>'
    + '</td>'
    + '<td style="vertical-align:middle;text-align:left;">'
    + '<div style="font-size:26px;font-weight:900;color:#ffffff;line-height:1.1;letter-spacing:-0.5px;">AFB<span style="color:#facc15;">.</span>Taxis</div>'
    + '<div style="font-size:10px;font-weight:700;color:#6b7280;letter-spacing:3px;text-transform:uppercase;margin-top:2px;">Fontainebleau</div>'
    + '</td></tr></table>'
    + '<div style="width:60px;height:3px;background:linear-gradient(90deg,transparent,#facc15,transparent);margin:25px auto 20px;border-radius:2px;"></div>'
    + '<div style="display:inline-block;background:' + badgeBg + ';color:' + badgeColor + ';border:1px solid ' + badgeBorder + ';padding:10px 22px;border-radius:50px;font-weight:800;font-size:13px;letter-spacing:1.5px;">' + badgeText + '</div>'
    + '</td></tr>'

    // === INTRO (client only) ===
    + (!isAdmin ? '<tr><td style="background-color:#ffffff;padding:35px 35px 0;"><p style="margin:0;font-size:17px;line-height:1.6;color:#374151;text-align:center;">Bonjour <strong style="color:#111827;">' + safe.first_name + '</strong>,<br>Nous avons bien recu votre demande de reservation.<br><span style="color:#6b7280;font-size:15px;">Voici le recapitulatif de votre trajet.</span></p></td></tr>' : '')

    // === ROUTE CARD ===
    + '<tr><td style="background-color:#ffffff;padding:30px 35px;">'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#fafafa 0%,#f3f4f6 100%);border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">'
    // Departure
    + '<tr><td style="padding:22px 25px 12px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>'
    + '<td style="vertical-align:top;padding-right:15px;padding-top:2px;"><div style="width:14px;height:14px;border-radius:50%;background-color:#facc15;border:3px solid #fef08a;"></div></td>'
    + '<td><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:5px;">DEPART</div>'
    + '<div style="font-size:16px;font-weight:700;color:#111827;line-height:1.4;">' + safe.pickup_location + '</div></td>'
    + '</tr></table></td></tr>'
    // Connector
    + '<tr><td style="padding:0 25px 0 32px;"><div style="width:2px;height:25px;background:linear-gradient(180deg,#facc15,#374151);margin-left:6px;border-radius:1px;"></div></td></tr>'
    // Arrival
    + '<tr><td style="padding:12px 25px 22px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>'
    + '<td style="vertical-align:top;padding-right:15px;padding-top:2px;"><div style="width:14px;height:14px;border-radius:50%;background-color:#111827;border:3px solid #6b7280;"></div></td>'
    + '<td><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:5px;">ARRIVEE</div>'
    + '<div style="font-size:16px;font-weight:700;color:#111827;line-height:1.4;">' + safe.dropoff_location + '</div></td>'
    + '</tr></table></td></tr>'
    + '</table></td></tr>'

    // === TRIP DETAILS ===
    + '<tr><td style="background-color:#ffffff;padding:0 35px 25px;">'
    + '<div style="font-size:11px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:2px;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid #f3f4f6;">Details du trajet</div>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
    + '<tr><td width="50%" style="padding-bottom:18px;vertical-align:top;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Date</div><div style="font-size:15px;font-weight:700;color:#111827;">' + safe.pickup_date + '</div></td>'
    + '<td width="50%" style="padding-bottom:18px;vertical-align:top;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Heure</div><div style="font-size:15px;font-weight:700;color:#111827;">' + safe.pickup_time + '</div></td></tr>'
    + '<tr><td width="50%" style="padding-bottom:18px;vertical-align:top;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Passagers</div><div style="font-size:15px;font-weight:700;color:#111827;">' + safe.passengers + ' personne' + (passengerCount > 1 ? 's' : '') + '</div></td>'
    + '<td width="50%" style="padding-bottom:18px;vertical-align:top;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Type</div><div style="font-size:15px;font-weight:700;color:#111827;">' + tripType + '</div></td></tr>'
    + '<tr><td colspan="2" style="padding-bottom:5px;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Tarif estime</div><div style="font-size:18px;font-weight:900;color:#a16207;">' + (safeContext || 'Sur devis') + '</div></td></tr>'
    + '</table></td></tr>'

    // === CLIENT INFO ===
    + '<tr><td style="background-color:#ffffff;padding:0 35px 25px;">'
    + '<div style="font-size:11px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:2px;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid #f3f4f6;">Coordonnees du client</div>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
    + '<tr><td width="50%" style="padding-bottom:15px;vertical-align:top;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Nom</div><div style="font-size:15px;font-weight:700;color:#111827;">' + safe.first_name + ' ' + safe.last_name + '</div></td>'
    + '<td width="50%" style="padding-bottom:15px;vertical-align:top;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Telephone</div><div style="font-size:15px;font-weight:700;"><a href="tel:' + safe.phone + '" style="color:#a16207;text-decoration:none;">' + safe.phone + '</a></div></td></tr>'
    + (safe.email ? '<tr><td colspan="2" style="padding-bottom:10px;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Email</div><div style="font-size:15px;font-weight:600;color:#111827;">' + safe.email + '</div></td></tr>' : '')
    + '</table></td></tr>'

    // === SPECIAL REQUESTS ===
    + (safe.message || safe.special_needs
      ? '<tr><td style="background-color:#ffffff;padding:0 35px 30px;">'
        + '<div style="font-size:11px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:2px;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid #f3f4f6;">Demandes speciales</div>'
        + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fffbeb;border:1px solid #fef08a;border-radius:12px;"><tr><td style="padding:18px 20px;">'
        + (safe.special_needs ? '<p style="margin:0 0 8px;font-size:14px;color:#92400e;"><strong>Besoins :</strong> ' + safe.special_needs + '</p>' : '')
        + (safe.message ? '<p style="margin:0;font-size:14px;color:#78350f;font-style:italic;">' + safe.message + '</p>' : '')
        + '</td></tr></table></td></tr>'
      : '')

    // === QUICK ACTIONS (admin only) ===
    + (isAdmin ? (() => {
      const waMsg = encodeURIComponent(
        'Bonjour ' + form.first_name + ' ' + form.last_name + ',\n\n'
        + 'Suite a votre demande de reservation AFB Taxis :\n\n'
        + 'Trajet : ' + form.pickup_location + ' → ' + form.dropoff_location + '\n'
        + 'Date : ' + form.pickup_date + ' a ' + form.pickup_time + '\n'
        + 'Passagers : ' + form.passengers + '\n'
        + 'Type : ' + tripType + '\n'
        + (safeContext ? 'Tarif : ' + safeContext + '\n' : '')
        + '\nNous confirmons votre prise en charge. Votre chauffeur sera present a l\'heure convenue.\n\n'
        + 'Cordialement,\nAFB Taxis Fontainebleau\n06 07 42 46 16'
      );
      const phoneClean = String(form.phone).replace(/[^\d+]/g, '').replace(/^0/, '33');
      const waUrl = 'https://wa.me/' + phoneClean + '?text=' + waMsg;

      const mailSubject = encodeURIComponent('Confirmation de votre reservation - AFB Taxis');
      const mailBody = encodeURIComponent(
        'Bonjour ' + form.first_name + ' ' + form.last_name + ',\n\n'
        + 'Suite a votre demande de reservation AFB Taxis :\n\n'
        + 'Trajet : ' + form.pickup_location + ' → ' + form.dropoff_location + '\n'
        + 'Date : ' + form.pickup_date + ' a ' + form.pickup_time + '\n'
        + 'Passagers : ' + form.passengers + '\n'
        + 'Type : ' + tripType + '\n'
        + (safeContext ? 'Tarif : ' + safeContext + '\n' : '')
        + '\nNous confirmons votre prise en charge. Votre chauffeur sera present a l\'heure convenue.\n\n'
        + 'Cordialement,\nAFB Taxis Fontainebleau\n06 07 42 46 16'
      );
      const mailUrl = 'mailto:' + String(form.email || '').trim() + '?subject=' + mailSubject + '&body=' + mailBody;

      return '<tr><td style="background-color:#ffffff;padding:0 35px 30px;">'
        + '<div style="font-size:11px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:2px;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid #f3f4f6;">Actions rapides</div>'
        + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
        + '<td width="50%" style="padding-right:8px;"><a href="' + waUrl + '" style="display:block;background-color:#25D366;color:#ffffff;padding:14px 10px;border-radius:12px;font-size:14px;font-weight:800;text-decoration:none;text-align:center;">WhatsApp ' + safe.first_name + '</a></td>'
        + '<td width="50%" style="padding-left:8px;"><a href="' + mailUrl + '" style="display:block;background-color:#111827;color:#ffffff;padding:14px 10px;border-radius:12px;font-size:14px;font-weight:800;text-decoration:none;text-align:center;">Email ' + safe.first_name + '</a></td>'
        + '</tr></table>'
        + '<p style="margin:10px 0 0;font-size:11px;color:#9ca3af;text-align:center;">Messages pre-remplis avec les details de la reservation</p>'
        + '</td></tr>';
    })() : '')

    // === CTA (client only) ===
    + (!isAdmin
      ? '<tr><td style="background-color:#ffffff;padding:0 35px 35px;">'
        + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#fefce8 0%,#fef9c3 100%);border:1px solid #fde047;border-radius:14px;"><tr><td style="padding:25px;text-align:center;">'
        + '<p style="margin:0 0 5px;font-size:15px;font-weight:700;color:#92400e;">Notre chauffeur vous contactera prochainement</p>'
        + '<p style="margin:0;font-size:13px;color:#a16207;">pour confirmer les details de votre prise en charge.</p>'
        + '</td></tr></table></td></tr>'
      : '')

    // === FOOTER ===
    + '<tr><td style="background:linear-gradient(135deg,#0a0a0a 0%,#171717 100%);padding:30px 35px;text-align:center;">'
    + '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 20px;"><tr>'
    + '<td style="padding-right:10px;"><a href="tel:+33607424616" style="display:inline-block;background-color:#facc15;color:#111827;padding:10px 20px;border-radius:50px;font-size:13px;font-weight:800;text-decoration:none;">06 07 42 46 16</a></td>'
    + '<td><a href="https://wa.me/33607424616" style="display:inline-block;background-color:#25D366;color:#ffffff;padding:10px 20px;border-radius:50px;font-size:13px;font-weight:800;text-decoration:none;">WhatsApp</a></td>'
    + '</tr></table>'
    + '<div style="width:40px;height:2px;background:linear-gradient(90deg,transparent,#333,transparent);margin:0 auto 15px;"></div>'
    + '<p style="margin:0 0 5px;font-size:12px;color:#6b7280;font-weight:600;">AFB Taxis Fontainebleau</p>'
    + '<p style="margin:0 0 5px;font-size:11px;color:#4b5563;">312 Route de Vosves, 77190 Dammarie-les-Lys</p>'
    + '<p style="margin:0;font-size:11px;color:#4b5563;">' + year + ' AFB Taxis - SIRET 453 837 262 00030</p>'
    + '</td></tr>'

    + '</table></td></tr></table></body></html>';
  };

  try {
    const promises = [];

    promises.push(
      transporter.sendMail({
        from: '"Reservations AFB Taxis" <afb@afbtaxis.com>',
        to: 'afb@afbtaxis.com',
        replyTo: form.email ? String(form.email).trim() : undefined,
        subject: 'Nouvelle course : ' + String(form.first_name).replace(/[\r\n]/g, ' ') + ' ' + String(form.last_name).replace(/[\r\n]/g, ' ') + ' - ' + String(form.pickup_date).replace(/[\r\n]/g, ' ') + ' a ' + String(form.pickup_time).replace(/[\r\n]/g, ' '),
        html: generateEmailHtml(true),
      })
    );

    if (form.email) {
      promises.push(
        transporter.sendMail({
          from: '"AFB Taxis Fontainebleau" <afb@afbtaxis.com>',
          to: form.email,
          subject: 'Confirmation de reservation - AFB Taxis Fontainebleau',
          html: generateEmailHtml(false),
        })
      );
    }

    await Promise.all(promises);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Nodemailer error:', error);
    return res.status(500).json({ error: 'Envoi impossible pour le moment.' });
  }
}
