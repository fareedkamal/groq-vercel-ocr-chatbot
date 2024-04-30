'use server';
import { createClient } from '@/utils/supabase/server';

export async function saveConversation(value: string, userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from('conversations').insert({
    user_id: userId,
    value: value,
  });
  return true;
}

export async function getConversations(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true }); // Sort by created_at column in descending order
  if (error) {
    console.error('Error fetching conversations:', error.message);
    return null;
  }
  const resData = data.map((d) => JSON.parse(d.value));
  const combinedArray = resData.flat();
  return combinedArray;
}
