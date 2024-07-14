import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';

export function CreateTripPage() {
  const navigate = useNavigate();
    
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpan, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState([
    'diego@rocketseat.com.br',
    'jessica.white44@yahoo.com',
    'erik_leffler3@gmail.com',
    'rebekah.conn21@gmail.com',
    'emile.mayer25@yahoo.com',
    'justus_hessel81@hotmail.com',
    'hellen_graham@yahoo.com'
  ]);
  
  //#region Functions
  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openCofirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeCofirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('submit');
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if (!email) return;

    if (emailsToInvite.includes(email)) return;

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);

    setEmailsToInvite(newEmailList);
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    navigate('/trips/123');
  }
  //#endregion

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className='size-5 text-zinc-400' />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
            </div>

            <div className='flex items-center gap-2'>
              <Calendar className='size-5 text-zinc-400' />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none" />
            </div>

            <div className='w-px h-6 bg-zinc-800' />

            {isGuestsInputOpen ? (
              <button onClick={closeGuestsInput} className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'>
                Alterar local/data
                <Settings2 className='size-5' />
              </button>
            ) : (
              <button onClick={openGuestsInput} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                Continuar
                <ArrowRight className='size-5' />
              </button>
              )}
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button type='button' onClick={openGuestsModal} className='flex items-center gap-2 flex-1 text-left'>
              <UserRoundPlus className='size-5 text-zinc-400' />
              {emailsToInvite.length > 0 ? (
                <span className='text-zinc-100 text-lg flex-1'>
                  {emailsToInvite.length} pessoa{emailsToInvite.length > 1 && 's'} convidada{emailsToInvite.length > 1 && 's'}
                </span>
              ) : (
                <span className='text-zinc-400 text-lg flex-1'>Quem estará na viagem?</span>
              )}
            </button>

            <div className='w-px h-6 bg-zinc-800' />

            <button onClick={openCofirmTripModal} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
              Confirmar viagem
              <ArrowRight className='size-5' />
            </button>
          </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br /> com nossos <a className="text-zinc-500 underline" href='#'>termos de uso</a> e <a className="text-zinc-500 underline" href='#'>políticas de privacidade</a>.
        </p>
      </div>



      {isGuestsModalOpan && (
        <InviteGuestsModal
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            closeGuestsModal={closeCofirmTripModal}
            removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

        {isConfirmTripModalOpen && (
          <ConfirmTripModal
            closeCofirmTripModal={closeCofirmTripModal}
            createTrip={createTrip}
          />
        )}

    </div>
  )
}
