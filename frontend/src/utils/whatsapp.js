import { siteSettings } from '../data/siteContent';

export function getWhatsAppUrl(message = "Hi TeddyPups! I'd love to know more about your puppies.") {
  return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
