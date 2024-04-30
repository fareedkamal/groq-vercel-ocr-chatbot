import { MessageCircle } from 'lucide-react';

const data = [
  {
    id: 1,
    title: 'chat 1',
  },
  {
    id: 2,
    title: 'chat 2',
  },
];

const ChatHistory = () => {
  return (
    <div className='flex flex-col w-[200px] gap-2'>
      <h1>Chat History</h1>
      {data.map((item) => (
        <div
          className='p-2 flex cursor-pointer hover:bg-yellow-600 justify-between bg-stone-700 rounded-md'
          key={item.id}
        >
          item
          <MessageCircle />
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
