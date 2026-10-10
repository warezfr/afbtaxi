import { useEffect, useRef } from 'react';
import { COMPANY } from '../lib/constants';
import { X } from '@phosphor-icons/react';

export type LegalDocType = 'mentions' | 'privacy' | 'cookies' | null;

interface Props {
  activeDoc: LegalDocType;
  onClose: () => void;
}

export function LegalModals({ activeDoc, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (activeDoc) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [activeDoc]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!activeDoc) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="m-auto w-full max-w-3xl bg-transparent p-4 sm:p-6"
    >
      <div className="flex max-h-[85vh] flex-col overflow-hidden rounded-card bg-white shadow-2xl dark:bg-zinc-950 dark:border dark:border-white/10">
        <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-white/10">
          <h2 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {activeDoc === 'mentions' && 'Mentions Légales'}
            {activeDoc === 'privacy' && 'Politique de Confidentialité'}
            {activeDoc === 'cookies' && 'Gestion des Cookies'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6 prose prose-zinc dark:prose-invert max-w-none text-sm">
          {activeDoc === 'mentions' && (
            <>
              <h3>Éditeur du site</h3>
              <p>
                Le site <strong>{COMPANY.website}</strong> est édité par la société <strong>{COMPANY.name}</strong>, {COMPANY.legalForm} au capital social de XXX €, immatriculée sous le numéro SIREN <strong>{COMPANY.siren}</strong> (SIRET: {COMPANY.siret}).
              </p>
              <p>
                <strong>Siège social :</strong> {COMPANY.street}, {COMPANY.postalCode} {COMPANY.city}, {COMPANY.country}.
              </p>
              <p>
                <strong>Téléphone :</strong> {COMPANY.phone}<br/>
                <strong>Email :</strong> <button onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))} className="text-gold-600 hover:underline">{COMPANY.email}</button>
              </p>
              <p>
                <strong>Directeur de la publication :</strong> Gérant de {COMPANY.name}
              </p>
              
              <h3>Propriété Intellectuelle</h3>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </>
          )}

          {activeDoc === 'privacy' && (
            <>
              <h3>Collecte des données personnelles</h3>
              <p>
                Dans le cadre de l'utilisation de nos services de réservation et de contact, {COMPANY.name} est amené à collecter et traiter certaines de vos données personnelles (nom, numéro de téléphone, email, adresses de départ et destination).
              </p>
              
              <h3>Finalité du traitement</h3>
              <p>
                Ces données sont strictement utilisées pour :
              </p>
              <ul>
                <li>Traiter vos demandes de réservation de VTC/Taxi.</li>
                <li>Vous contacter concernant votre course.</li>
                <li>Gérer la relation client et la facturation.</li>
              </ul>
              
              <h3>Conservation et Sécurité</h3>
              <p>
                Vos données sont conservées pour la durée nécessaire à l'exécution de la prestation et à des fins de comptabilité. {COMPANY.name} s'engage à prendre toutes les mesures nécessaires pour assurer la sécurité et la confidentialité de vos données personnelles. Elles ne sont jamais revendues à des tiers.
              </p>
              
              <h3>Vos droits (RGPD)</h3>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données. Pour exercer ce droit, vous pouvez nous contacter à l'adresse : <button onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))} className="text-gold-600 hover:underline">{COMPANY.email}</button>.
              </p>
            </>
          )}

          {activeDoc === 'cookies' && (
            <>
              <h3>Que sont les cookies ?</h3>
              <p>
                Un "cookie" est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web. Il permet de conserver des données utilisateur afin de faciliter la navigation et d'améliorer votre expérience.
              </p>
              
              <h3>Cookies utilisés sur ce site</h3>
              <p>
                Le site {COMPANY.website} utilise principalement des cookies "strictement nécessaires" au fonctionnement du site, notamment :
              </p>
              <ul>
                <li><strong>Cookies de session :</strong> pour maintenir votre connexion (ex: espace administration).</li>
                <li><strong>Cookies de préférences :</strong> pour mémoriser vos choix d'interface (ex: thème clair ou sombre).</li>
              </ul>
              
              <h3>Consentement et Gestion</h3>
              <p>
                Aucun cookie publicitaire ou de profilage n'est déposé sans votre consentement explicite. 
                Vous pouvez configurer votre navigateur pour bloquer les cookies, mais cela pourrait altérer certaines fonctionnalités du site.
              </p>
              <p>
                <em>Pour plus d'informations sur la gestion des cookies, vous pouvez consulter le site de la CNIL (cnil.fr).</em>
              </p>
            </>
          )}
        </div>
        
        <div className="border-t border-zinc-200 bg-zinc-50 p-6 text-right dark:border-white/10 dark:bg-zinc-900">
          <button
            onClick={onClose}
            className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-zinc-950"
          >
            Fermer
          </button>
        </div>
      </div>
    </dialog>
  );
}
