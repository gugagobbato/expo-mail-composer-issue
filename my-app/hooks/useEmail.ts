import * as MailComposer from 'expo-mail-composer';
import { useState } from 'react';

export function useEmail() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const checkAvailability = async () => {
    const available = await MailComposer.isAvailableAsync();
    setIsAvailable(available);
    return available;
  };

  const sendEmail = async ({ to, subject, body, isHtml, attachments, cc = [], bcc = [] }:
    { to: string; subject: string; body: string; isHtml: boolean; attachments?: string[]; cc?: string[]; bcc?: string[] }) => {
    setIsSending(true);
    try {
      const available = await checkAvailability();
      if (!available) {
        alert('O envio de e-mail não é suportado neste dispositivo.');
        setIsSending(false);
        return;
      }

      const options = { recipients: [to], subject, body, isHtml, attachments, ccRecipients: cc, bccRecipients: bcc };
      await MailComposer.composeAsync(options);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      alert('Ocorreu um erro ao tentar enviar o e-mail.');
    } finally {
      setIsSending(false);
    }
  };

  return {
    isAvailable,
    isSending,
    checkAvailability,
    sendEmail,
  };
}