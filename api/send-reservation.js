import nodemailer from 'nodemailer';

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
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: 'reservation@afbtaxis.com',
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });

  const generateEmailHtml = (isAdmin) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${isAdmin ? 'Nouvelle Réservation' : 'Confirmation de Réservation'} - AFB Taxis</title>
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #111827; padding: 40px 20px; margin: 0; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
      .header { background: #0a0a0a; padding: 35px 20px; text-align: center; }
      .logo-container { display: inline-flex; align-items: center; justify-content: center; gap: 12px; }
      .logo-icon { background-color: #facc15; width: 44px; height: 44px; border-radius: 12px; display: inline-block; position: relative; overflow: hidden; vertical-align: middle; }
      .logo-letter { font-family: Arial, sans-serif; font-size: 20px; font-weight: 900; color: #111827; line-height: 44px; text-align: center; display: block; }
      .logo-checker { position: absolute; bottom: 0; left: 0; right: 0; height: 6px; background-color: #000; }
      .logo-text-wrapper { text-align: left; vertical-align: middle; display: inline-block; }
      .logo-title { display: block; font-size: 20px; font-weight: 900; color: #ffffff; margin: 0; line-height: 1.1; }
      .logo-subtitle { display: block; font-size: 10px; font-weight: bold; color: #9ca3af; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
      
      .content { padding: 40px 30px; }
      .badge { display: inline-block; background: ${isAdmin ? '#fefce8' : '#f0fdf4'}; color: ${isAdmin ? '#ca8a04' : '#166534'}; border: 1px solid ${isAdmin ? '#fde047' : '#bbf7d0'}; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 13px; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px; }
      .intro-text { font-size: 16px; line-height: 1.5; color: #4b5563; margin-bottom: 30px; text-align: center; }
      
      .section-title { font-size: 12px; text-transform: uppercase; color: #9ca3af; font-weight: bold; margin-bottom: 15px; letter-spacing: 1px; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px; }
      .grid { display: block; margin-bottom: 30px; }
      .field { display: inline-block; width: 48%; vertical-align: top; margin-bottom: 20px; }
      .field label { display: block; font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: bold; margin-bottom: 4px; }
      .field p { margin: 0; font-size: 15px; color: #111827; font-weight: 600; }
      
      .route { background: #f9fafb; border: 1px solid #f3f4f6; padding: 25px; border-radius: 12px; margin-bottom: 30px; }
      .route-point { margin-bottom: 20px; }
      .route-point:last-child { margin-bottom: 0; }
      .point-label { font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: bold; margin-bottom: 5px; display: block; }
      .point-value { margin: 0; font-size: 16px; font-weight: 700; color: #111827; }
      
      .footer { background: #0a0a0a; padding: 30px 20px; text-align: center; font-size: 13px; color: #9ca3af; }
      .footer-contact { margin-top: 15px; color: #facc15; font-weight: bold; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo-container">
          <div class="logo-icon">
            <span class="logo-letter">A</span>
            <div class="logo-checker"></div>
          </div>
          <div class="logo-text-wrapper">
            <span class="logo-title">AFB.Taxis</span>
            <span class="logo-subtitle">Fontainebleau</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div style="text-align: center;">
          <div class="badge">${isAdmin ? 'NOUVELLE RÉSERVATION' : 'RÉSERVATION CONFIRMÉE'}</div>
          ${!isAdmin ? '<p class="intro-text">Bonjour <strong>' + form.first_name + '</strong>,<br>Nous avons bien reçu votre demande de réservation. Voici un récapitulatif de votre trajet.</p>' : ''}
        </div>
        
        <div class="route">
          <div class="route-point">
            <span class="point-label">📍 Départ</span>
            <p class="point-value">${form.pickup_location}</p>
          </div>
          <div style="width: 2px; height: 20px; background: #e5e7eb; margin: -10px 0 10px 6px;"></div>
          <div class="route-point">
            <span class="point-label">🏁 Arrivée</span>
            <p class="point-value">${form.dropoff_location}</p>
          </div>
        </div>

        <div class="section-title">Détails du Trajet</div>
        <div class="grid">
          <div class="field">
            <label>Date</label>
            <p>${form.pickup_date}</p>
          </div>
          <div class="field">
            <label>Heure</label>
            <p>${form.pickup_time}</p>
          </div>
          <div class="field">
            <label>Passagers</label>
            <p>${form.passengers} pers.</p>
          </div>
          <div class="field">
            <label>Type de Trajet</label>
            <p>${form.trip_type === 'aller_retour' ? 'Aller-Retour' : 'Aller simple'}</p>
          </div>
          <div class="field" style="width: 100%;">
            <label>Véhicule & Tarif Estimé</label>
            <p style="color: #ca8a04;">${context || 'Sur devis'}</p>
          </div>
        </div>

        <div class="section-title">Coordonnées</div>
        <div class="grid">
          <div class="field">
            <label>Nom complet</label>
            <p>${form.first_name} ${form.last_name}</p>
          </div>
          <div class="field">
            <label>Téléphone</label>
            <p>${form.phone}</p>
          </div>
          ${form.email ? '<div class="field" style="width: 100%;"><label>Email</label><p>' + form.email + '</p></div>' : ''}
        </div>

        ${form.message || form.special_needs ? `
        <div class="section-title">Demandes Spéciales</div>
        <div style="background: #fefce8; border: 1px solid #fef08a; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
          ${form.special_needs ? `<p style="margin: 0 0 12px; font-size: 14px;"><strong>Besoins :</strong> ${form.special_needs}</p>` : ''}
          ${form.message ? `<p style="margin: 0; font-size: 14px; font-style: italic; color: #4b5563;">"${form.message}"</p>` : ''}
        </div>
        ` : ''}

        ${!isAdmin ? '<p style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 30px;">Notre chauffeur vous contactera très prochainement pour confirmer les derniers détails de votre prise en charge.</p>' : ''}

      </div>
      <div class="footer">
        © ${new Date().getFullYear()} AFB Taxis Fontainebleau. Tous droits réservés.<br>
        <div class="footer-contact">06 07 42 46 16 • reservation@afbtaxis.com</div>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const promises = [];

    promises.push(
      transporter.sendMail({
        from: '"Réservations AFB Taxis" <reservation@afbtaxis.com>',
        to: 'mahdi243@gmail.com',
        replyTo: form.email || undefined,
        subject: `🚨 Nouvelle course : ${form.first_name} ${form.last_name}`,
        html: generateEmailHtml(true),
      })
    );

    if (form.email) {
      promises.push(
        transporter.sendMail({
          from: '"AFB Taxis Fontainebleau" <reservation@afbtaxis.com>',
          to: form.email,
          subject: `Confirmation de votre demande de réservation - AFB Taxis`,
          html: generateEmailHtml(false),
        })
      );
    }

    await Promise.all(promises);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return res.status(500).json({ 
      error: error.message + ` [DEBUG: Vercel lit bien le mot de passe de ${process.env.SMTP_PASSWORD?.length || 0} caractères, vérifiez les blocages IP sur Haisoft]` 
    });
  }
}
