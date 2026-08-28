import { useEffect, useRef } from 'react';
import { COMPANY } from '@/lib/constants';
import { X } from 'lucide-react';

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

  // Handle light dismiss
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
      className="backdrop:bg-gray-900/50 backdrop:backdrop-blur-sm bg-transparent w-full max-w-3xl m-auto p-4 sm:p-6"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">
            {activeDoc === 'mentions' && 'Mentions Légales'}
            {activeDoc === 'privacy' && 'Politique de Confidentialité'}
            {activeDoc === 'cookies' && 'Gestion des Cookies'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto text-gray-600 dark:text-gray-300 text-sm space-y-4">
          {activeDoc === 'mentions' && (
            <>
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Éditeur du site</h3>
              <p>
                Le site <strong>{COMPANY.website}</strong> est édité par la société <strong>{COMPANY.name}</strong>, {COMPANY.legalForm} au capital social de XXX €, immatriculée sous le numéro SIREN <strong>{COMPANY.siren}</strong> (SIRET: {COMPANY.siret}).
              </p>
              <p>
                <strong>Siège social :</strong> {COMPANY.street}, {COMPANY.postalCode} {COMPANY.city}, {COMPANY.country}.
              </p>
              <p>
                <strong>Téléphone :</strong> {COMPANY.phone}<br/>
                <strong>Email :</strong> <a href={`mailto:${COMPANY.email}`} className="text-gold-600 hover:underline">{COMPANY.email}</a>
              </p>
              <p>
                <strong>Directeur de la publication :</strong> Gérant de {COMPANY.name}
              </p>
              

              <h3 className="font-bold text-gray-900 dark:text-white text-base mt-6">Propriété Intellectuelle</h3>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </>
          )}

          {activeDoc === 'privacy' && (
            <>
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Collecte des données personnelles</h3>
              <p>
                Dans le cadre de l'utilisation de nos services de réservation et de contact, {COMPANY.name} est amené à collecter et traiter certaines de vos données personnelles (nom, numéro de téléphone, email, adresses de départ et destination).
              </p>
              
              <h3 className="font-bold text-gray-900 dark:text-white text-base mt-6">Finalité du traitement</h3>
              <p>
                Ces données sont strictement utilisées pour :
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Traiter vos demandes de réservation de VTC/Taxi.</li>
                <li>Vous contacter concernant votre course.</li>
                <li>Gérer la relation client et la facturation.</li>
              </ul>
              
              <h3 className="font-bold text-gray-900 dark:text-white text-base mt-6">Conservation et Sécurité</h3>
              <p>
                Vos données sont conservées pour la durée nécessaire à l'exécution de la prestation et à des fins de comptabilité. {COMPANY.name} s'engage à prendre toutes les mesures nécessaires pour assurer la sécurité et la confidentialité de vos données personnelles. Elles ne sont jamais revendues à des tiers.
              </p>
              
              <h3 className="font-bold text-gray-900 dark:text-white text-base mt-6">Vos droits (RGPD)</h3>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données. Pour exercer ce droit, vous pouvez nous contacter à l'adresse : <a href={`mailto:${COMPANY.email}`} className="text-gold-600 hover:underline">{COMPANY.email}</a>.
              </p>
            </>
          )}

          {activeDoc === 'cookies' && (
            <>
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Que sont les cookies ?</h3>
              <p>
                Un "cookie" est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web. Il permet de conserver des données utilisateur afin de faciliter la navigation et d'améliorer votre expérience.
              </p>
              
              <h3 className="font-bold text-gray-900 dark:text-white text-base mt-6">Cookies utilisés sur ce site</h3>
              <p>
                Le site {COMPANY.website} utilise principalement des cookies "strictement nécessaires" au fonctionnement du site, notamment :
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Cookies de session :</strong> pour maintenir votre connexion (ex: espace administration).</li>
                <li><strong>Cookies de préférences :</strong> pour mémoriser vos choix d'interface (ex: thème clair ou sombre).</li>
              </ul>
              
              <h3 className="font-bold text-gray-900 dark:text-white text-base mt-6">Consentement et Gestion</h3>
              <p>
                Aucun cookie publicitaire ou de profilage n'est déposé sans votre consentement explicite. 
                Vous pouvez configurer votre navigateur pour bloquer les cookies, mais cela pourrait altérer certaines fonctionnalités du site.
              </p>
              <p className="mt-4 text-xs italic">
                Pour plus d'informations sur la gestion des cookies, vous pouvez consulter le site de la CNIL (cnil.fr).
              </p>
            </>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-full hover:opacity-90 transition-opacity"
          >
            Fermer
          </button>
        </div>
      </div>
    </dialog>
  );
}
