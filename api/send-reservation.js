import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { form, context } = req.body;

  if (!process.env.SMTP_PASSWORD) {
    return res.status(500).json({ error: 'Veuillez configurer SMTP_PASSWORD dans Vercel.' });
  }

  // Configuration SMTP Haisoft
  const transporter = nodemailer.createTransport({
    host: 'srv04.haisoft.net',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'afb@afbtaxis.com',
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const htmlTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Nouvelle Réservation AFB Taxis</title>
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #111827; padding: 40px 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
      .header { background: #0a0a0a; padding: 30px 20px; text-align: center; }
      .header img { height: 40px; }
      .header h1 { color: #facc15; margin: 15px 0 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
      .content { padding: 30px; }
      .badge { display: inline-block; background: #fefce8; color: #ca8a04; border: 1px solid #fde047; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 12px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
      .section-title { font-size: 12px; text-transform: uppercase; color: #9ca3af; font-weight: bold; margin-bottom: 15px; letter-spacing: 1px; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
      .field { margin-bottom: 15px; }
      .field label { display: block; font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: bold; margin-bottom: 4px; }
      .field p { margin: 0; font-size: 15px; color: #111827; font-weight: 500; }
      .route { background: #f9fafb; border: 1px solid #f3f4f6; padding: 20px; border-radius: 12px; margin-bottom: 25px; position: relative; }
      .route-point { display: flex; align-items: center; margin-bottom: 15px; }
      .route-point:last-child { margin-bottom: 0; }
      .dot { width: 10px; height: 10px; border-radius: 50%; background: #facc15; margin-right: 15px; }
      .dot.end { background: #111827; }
      .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>AFB.Taxis</h1>
      </div>
      <div class="content">
        <div style="text-align: center;">
          <div class="badge">Nouvelle Demande</div>
        </div>
        
        <div class="route">
          <div class="route-point">
            <div class="dot"></div>
            <div>
              <label style="font-size: 10px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Départ</label>
              <p style="margin: 0; font-size: 16px; font-weight: 600;">${form.pickup_location}</p>
            </div>
          </div>
          <div class="route-point">
            <div class="dot end"></div>
            <div>
              <label style="font-size: 10px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Arrivée</label>
              <p style="margin: 0; font-size: 16px; font-weight: 600;">${form.dropoff_location}</p>
            </div>
          </div>
        </div>

        <div class="section-title">Détails du client</div>
        <div class="grid" style="display: flex; flex-wrap: wrap;">
          <div class="field" style="width: 50%;">
            <label>Client</label>
            <p>${form.first_name} ${form.last_name}</p>
          </div>
          <div class="field" style="width: 50%;">
            <label>Téléphone</label>
            <p><a href="tel:${form.phone}" style="color: #ca8a04; text-decoration: none;">${form.phone}</a></p>
          </div>
          <div class="field" style="width: 50%;">
            <label>Email</label>
            <p>${form.email ? `<a href="mailto:${form.email}" style="color: #111827;">${form.email}</a>` : 'Non renseigné'}</p>
          </div>
        </div>

        <div class="section-title">Détails du Trajet</div>
        <div class="grid" style="display: flex; flex-wrap: wrap;">
          <div class="field" style="width: 50%;">
            <label>Date & Heure</label>
            <p>${form.pickup_date} à ${form.pickup_time}</p>
          </div>
          <div class="field" style="width: 50%;">
            <label>Passagers</label>
            <p>${form.passengers} pers.</p>
          </div>
          <div class="field" style="width: 50%;">
            <label>Type de Trajet</label>
            <p>${form.trip_type === 'aller_retour' ? 'Aller-Retour' : 'Aller simple'}</p>
          </div>
          <div class="field" style="width: 50%;">
            <label>Contexte / Prix</label>
            <p>${context || 'Sur devis'}</p>
          </div>
        </div>

        ${form.message || form.special_needs ? `
        <div class="section-title">Demandes Spéciales</div>
        <div style="background: #fefce8; border: 1px solid #fef08a; padding: 15px; border-radius: 8px;">
          ${form.special_needs ? `<p style="margin: 0 0 10px; font-size: 14px;"><strong>Besoins :</strong> ${form.special_needs}</p>` : ''}
          ${form.message ? `<p style="margin: 0; font-size: 14px; font-style: italic;">"${form.message}"</p>` : ''}
        </div>
        ` : ''}

      </div>
      <div class="footer">
        Cet email a été envoyé automatiquement depuis le site AFB Taxis.
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: '"Réservations AFB Taxis" <afb@afbtaxis.com>',
      to: 'mahdi243@gmail.com',
      replyTo: form.email || undefined,
      subject: `🚨 Nouvelle course : ${form.first_name} ${form.last_name}`,
      html: htmlTemplate,
    });

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return res.status(500).json({ error: error.message });
  }
}
