import nodemailer from 'nodemailer';

export const config = {
  region: 'cdg1',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { form, context } = req.body;

  if (!process.env.SMTP_PASSWORD) {
    return res.status(500).json({ error: 'Veuillez configurer SMTP_PASSWORD dans Vercel.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'srv04.haisoft.net',
    port: 465,
    secure: true,
    auth: {
      user: 'afb@afbtaxis.com',
      pass: process.env.SMTP_PASSWORD,
    }
  });

  const tripType = form.trip_type === 'aller_retour' ? 'Aller-Retour' : 'Aller simple';
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
    + (!isAdmin ? '<tr><td style="background-color:#ffffff;padding:35px 35px 0;"><p style="margin:0;font-size:17px;line-height:1.6;color:#374151;text-align:center;">Bonjour <strong style="color:#111827;">' + form.first_name + '</strong>,<br>Nous avons bien recu votre demande de reservation.<br><span style="color:#6b7280;font-size:15px;">Voici le recapitulatif de votre trajet.</span></p></td></tr>' : '')

    // === ROUTE CARD ===
    + '<tr><td style="background-color:#ffffff;padding:30px 35px;">'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#fafafa 0%,#f3f4f6 100%);border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">'
    // Departure
    + '<tr><td style="padding:22px 25px 12px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>'
    + '<td style="vertical-align:top;padding-right:15px;padding-top:2px;"><div style="width:14px;height:14px;border-radius:50%;background-color:#facc15;border:3px solid #fef08a;"></div></td>'
    + '<td><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:5px;">DEPART</div>'
    + '<div style="font-size:16px;font-weight:700;color:#111827;line-height:1.4;">' + form.pickup_location + '</div></td>'
    + '</tr></table></td></tr>'
    // Connector
    + '<tr><td style="padding:0 25px 0 32px;"><div style="width:2px;height:25px;background:linear-gradient(180deg,#facc15,#374151);margin-left:6px;border-radius:1px;"></div></td></tr>'
    // Arrival
    + '<tr><td style="padding:12px 25px 22px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>'
    + '<td style="vertical-align:top;padding-right:15px;padding-top:2px;"><div style="width:14px;height:14px;border-radius:50%;background-color:#111827;border:3px solid #6b7280;"></div></td>'
    + '<td><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:5px;">ARRIVEE</div>'
    + '<div style="font-size:16px;font-weight:700;color:#111827;line-height:1.4;">' + form.dropoff_location + '</div></td>'
    + '</tr></table></td></tr>'
    + '</table></td></tr>'

    // === TRIP DETAILS ===
    + '<tr><td style="background-color:#ffffff;padding:0 35px 25px;">'
    + '<div style="font-size:11px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:2px;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid #f3f4f6;">Details du trajet</div>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
    + '<tr><td width="50%" style="padding-bottom:18px;vertical-align:top;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Date</div><div style="font-size:15px;font-weight:700;color:#111827;">' + form.pickup_date + '</div></td>'
    + '<td width="50%" style="padding-bottom:18px;vertical-align:top;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Heure</div><div style="font-size:15px;font-weight:700;color:#111827;">' + form.pickup_time + '</div></td></tr>'
    + '<tr><td width="50%" style="padding-bottom:18px;vertical-align:top;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Passagers</div><div style="font-size:15px;font-weight:700;color:#111827;">' + form.passengers + ' personne' + (form.passengers > 1 ? 's' : '') + '</div></td>'
    + '<td width="50%" style="padding-bottom:18px;vertical-align:top;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Type</div><div style="font-size:15px;font-weight:700;color:#111827;">' + tripType + '</div></td></tr>'
    + '<tr><td colspan="2" style="padding-bottom:5px;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Tarif estime</div><div style="font-size:18px;font-weight:900;color:#a16207;">' + (context || 'Sur devis') + '</div></td></tr>'
    + '</table></td></tr>'

    // === CLIENT INFO ===
    + '<tr><td style="background-color:#ffffff;padding:0 35px 25px;">'
    + '<div style="font-size:11px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:2px;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid #f3f4f6;">Coordonnees du client</div>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
    + '<tr><td width="50%" style="padding-bottom:15px;vertical-align:top;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Nom</div><div style="font-size:15px;font-weight:700;color:#111827;">' + form.first_name + ' ' + form.last_name + '</div></td>'
    + '<td width="50%" style="padding-bottom:15px;vertical-align:top;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Telephone</div><div style="font-size:15px;font-weight:700;"><a href="tel:' + form.phone + '" style="color:#a16207;text-decoration:none;">' + form.phone + '</a></div></td></tr>'
    + (form.email ? '<tr><td colspan="2" style="padding-bottom:10px;"><div style="font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Email</div><div style="font-size:15px;font-weight:600;color:#111827;">' + form.email + '</div></td></tr>' : '')
    + '</table></td></tr>'

    // === SPECIAL REQUESTS ===
    + (form.message || form.special_needs
      ? '<tr><td style="background-color:#ffffff;padding:0 35px 30px;">'
        + '<div style="font-size:11px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:2px;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid #f3f4f6;">Demandes speciales</div>'
        + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fffbeb;border:1px solid #fef08a;border-radius:12px;"><tr><td style="padding:18px 20px;">'
        + (form.special_needs ? '<p style="margin:0 0 8px;font-size:14px;color:#92400e;"><strong>Besoins :</strong> ' + form.special_needs + '</p>' : '')
        + (form.message ? '<p style="margin:0;font-size:14px;color:#78350f;font-style:italic;">' + form.message + '</p>' : '')
        + '</td></tr></table></td></tr>'
      : '')

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
        to: 'mahdi243@gmail.com',
        replyTo: form.email || undefined,
        subject: 'Nouvelle course : ' + form.first_name + ' ' + form.last_name + ' - ' + form.pickup_date + ' a ' + form.pickup_time,
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
    console.error("Nodemailer error:", error);
    return res.status(500).json({ error: error.message });
  }
}
