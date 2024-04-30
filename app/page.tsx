'use client';

import { getOCR } from '@/apis/ocr';
import { useChat } from 'ai/react';
import { Paperclip } from 'lucide-react';
import axios from 'axios';
import UserButton from '@/components/user-button';
import ChatHistory from '@/components/chat-history';
import { useSelector } from 'react-redux';
import { Content } from 'next/font/google';
import { getConversations, saveConversation } from './api/chat-history';
import { useCallback, useEffect, useState } from 'react';

export default function Chat() {
  const user = useSelector((state: any) => state.Auth.user);
  const [loading, setLoading] = useState(false);
  const saveChat = async (m: any) => {
    if (user) {
      const lastChat = [
        {
          id: String(Date.now()),
          role: 'user',
          content: input,
          createdAt: Date.now(),
        },
        m,
      ];
      const res = await saveConversation(JSON.stringify(lastChat), user.id);
    }
  };

  const { messages, setMessages, input, handleInputChange, handleSubmit } =
    useChat({ onFinish: (m) => saveChat(m) });

  const getOCRResponse = async (data: string) => {
    const res: any = await axios.post('/api/chat', {
      messages: [
        {
          role: 'user',
          content: `below is the ocr generated from a w2 form. summarize this and and for every next prompt, answer according to this form.\n\n${data}`,
        },
      ],
      stream: false,
    });
    const responseMessage = res.data.choices[0].message;
    setMessages([...messages, { id: String(Date.now()), ...responseMessage }]);
    await saveConversation(
      JSON.stringify([{ id: String(Date.now()), ...responseMessage }]),
      user.id
    );
  };

  const handleFileChange = async (e: any) => {
    if (e.target.files) {
      setLoading(true);
      const formData = new FormData();
      const instructions = JSON.stringify({
        parts: [{ file: 'document' }],
        actions: [
          {
            type: 'ocr',
            language: 'english',
          },
        ],
        output: {
          type: 'json-content',
        },
      });
      formData.append('instructions', instructions);
      formData.append('document', e.target.files[0]);
      const res = await getOCR(formData);
      await getOCRResponse(res.pages[0].plainText);
      setLoading(false);
    }
  };

  const populateChat = useCallback(
    async (userId: string) => {
      const res = await getConversations(userId);
      if (res) {
        setMessages(res);
      }
    },
    [setMessages]
  );

  useEffect(() => {
    if (user) {
      populateChat(user.id);
    }
  }, [user, populateChat]);

  return (
    <main className='bg-stone-800 text-white'>
      <UserButton />

      <h1 className='mt-0 m-10 text-4xl md:text-6xl text-center pt-10 md:pt-20 font-bold tracking-tighter'>
        Upload a W2 Form for Chat
      </h1>
      {!user ? (
        <p className='text-center'>Login or Signup to store chat history</p>
      ) : null}
      {loading ? <p className='text-center'>Reading Document...</p> : null}
      <div className='flex'>
        <div className='flex flex-col max-w-xl mx-auto pt-2 md:pt-10 pb-32'>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-lg p-4 mb-4 ${
                m.role === 'user'
                  ? 'bg-blue-700 text-white max-w-max mx-6'
                  : 'bg-gray-700 text-gray-300 mx-6'
              }`}
            >
              <div className='whitespace-pre-wrap'>
                {m.role === 'user' ? (
                  <span className='font-semibold mr-1'>User:</span>
                ) : (
                  <span className='font-semibold mr-1'>Mixtral:</span>
                )}
                {m.content}
              </div>
            </div>
          ))}

          <form
            onSubmit={handleSubmit}
            className='flex gap-3 items-center justify-center fixed bottom-10 left-0 right-0 z-10 m-auto'
          >
            <div>
              <label htmlFor='file-input'>
                <Paperclip className='cursor-pointer h-10 w-10' />
              </label>
              <input
                className='hidden'
                type='file'
                id='file-input'
                accept='pdf'
                onChange={handleFileChange}
              />
            </div>
            <input
              className='rounded-full p-4 w-full border-2 border-gray-700 bg-gray-800  max-w-xs md:max-w-2xl placeholder:text-sm text-white'
              value={input}
              placeholder='Ask something...'
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </main>
  );
}
