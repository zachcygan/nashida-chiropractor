'use client'
import { useState, useEffect, useRef } from 'react'
import { useFormData } from './formContext'
import emailjs from '@emailjs/browser'
import Success from './success'
import Error from './error'

export default function ContactForm() {
  const { formData, updateFormData, handleStatus, clearState, setEmailTouched, emailTouched, success, error } = useFormData()
  const SuccessMessage = 'Thank you for your message, we will get back to you as soon as possible.'
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [sending, setSending] = useState<boolean>(false)

  const form = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true)
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      handleStatus('error', true);
      setErrorMessage('Please fill out all required fields.');
      setSending(false)
      return;
    }

    if (form.current !== null) {
      emailjs.sendForm('', '', form.current, '')
        .then((result) => {
          console.log(result.text)
          if (error) {
            handleStatus('error', false);
            setErrorMessage('')
            setSending(false)
          }
          setSending(false)
          handleStatus('success', true);
          setEmailTouched(false);
          clearState();
          localStorage.clear()
        }, (error) => {
          console.log(error.text);
        });
    } else {
      console.error("Form reference is null.");
    };
  };

  const isValidEmail = (email: string): boolean => {
    // This regex checks for most common email patterns.
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleCloseError = () => {
    handleStatus('error', false);
    setErrorMessage(''); // Reset the error message
  };

  const handleCloseSuccess = () => {
    handleStatus('success', false);
  }

  //clears localstorage whenever the user leaves the page
  useEffect(() => {
    window.onbeforeunload = function () {
      window.localStorage.clear();
    }
    window.onpagehide = function () {
      window.localStorage.clear();
    }
  }, []);

  useEffect(() => {
    if (success && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [success, error]);

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div ref={errorRef}>
        <Error message={errorMessage} onClose={handleCloseError} visible={error} />
      </div>
      <div ref={successRef}>
        <Success message={SuccessMessage} onClose={handleCloseSuccess} visible={success} />
      </div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pt-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="firstName"
                    className="outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={formData.firstName}
                    onChange={updateFormData}
                    placeholder='John'
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Smith</span> */}
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="lastName"
                    className="outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={formData.lastName}
                    onChange={updateFormData}
                    placeholder='Smith'
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="email" className="text-sm font-medium leading-6 text-gray-900 flex justify-between items-center">
                Email address
                {emailTouched && !isValidEmail(formData.email) && <span className="text-red-500 text-xs">Please enter a valid email address</span>}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => {
                    const value = e.target.value
                    if(value === '') {
                      setEmailTouched(false)
                    } else {
                      setEmailTouched(true)
                    }
                    updateFormData(e)
                  }}
                  placeholder='example@email.com'
                  className={`outline-none block w-full bg-transparent rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${emailTouched && !isValidEmail(formData.email) ? 'ring-2 ring-red-500 focus:outline-none focus:ring-red-500' : ''}`}
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                Subject
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    autoComplete="subject"
                    className="outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={formData.subject}
                    onChange={updateFormData}
                    placeholder='Available Appointments?'
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                Message
              </label>
              <div className="mt-2">
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  className="outline-none block bg-transparent w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.message}
                  onChange={updateFormData}
                  placeholder='Hello, are you available on Tuesday for an appointment?'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          disabled={sending}
        >
          {sending ? (
            <div className='cursor-not-allowed'>
              <div className='animate-spin'>
                <svg width="32px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" className="hds-flight-icon--animation-loading"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#FFFFFF" fillRule="evenodd" clipRule="evenodd"> <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"></path> <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path> </g> </g></svg>
              </div>
            </div>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </form>
  )
}