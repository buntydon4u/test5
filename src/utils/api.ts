import { supabase } from './supabase';

// Authentication functions
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

// Games functions
export const getGames = async () => {
  const { data: primeGames, error: primeError } = await supabase
    .from('games')
    .select('*')
    .eq('game_type', 'prime')
    .eq('is_active', true)
    .order('start_time', { ascending: true });

  const { data: localGames, error: localError } = await supabase
    .from('games')
    .select('*')
    .eq('game_type', 'local')
    .eq('is_active', true)
    .order('start_time', { ascending: true });

  if (primeError || localError) throw new Error('Error fetching games');

  return { prime: primeGames, local: localGames };
};

export const getAdminGames = async () => {
  const { data: games, error } = await supabase
    .from('games')
    .select('*')
    .order('nick_name', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Get unique game names and their latest instances
  const uniqueGames = [];
  const seenNames = new Set();

  for (const game of games) {
    if (!seenNames.has(game.nick_name)) {
      seenNames.add(game.nick_name);

      // Get the latest result for this game
      const { data: latestResult } = await supabase
        .from('results')
        .select('*')
        .eq('name', game.nick_name)
        .order('created_at', { ascending: false })
        .limit(1);

      uniqueGames.push({
        ...game,
        latestResult: latestResult && latestResult.length > 0 ? {
          result: latestResult[0].result,
          date: latestResult[0].created_at,
          time: latestResult[0].time
        } : null
      });
    }
  }

  return uniqueGames;
};

export const createGame = async (gameData: any) => {
  const { data, error } = await supabase
    .from('games')
    .insert([gameData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateGame = async (id: string, gameData: any) => {
  const { data, error } = await supabase
    .from('games')
    .update(gameData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteGame = async (id: string) => {
  const { error } = await supabase
    .from('games')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Results functions
export const getResults = async () => {
  const { data, error } = await supabase
    .from('results')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createResult = async (resultData: any) => {
  const { data, error } = await supabase
    .from('results')
    .insert([resultData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateResult = async (id: string, resultData: any) => {
  const { data, error } = await supabase
    .from('results')
    .update(resultData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteResult = async (id: string) => {
  const { error } = await supabase
    .from('results')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const publishResult = async (gameId: string, left: string, center: string, right: string) => {
  // Find the game to get its name
  const { data: game, error: gameError } = await supabase
    .from('games')
    .select('*')
    .eq('id', gameId)
    .single();

  if (gameError || !game) throw new Error('Game not found');

  // Create result
  const resultData = {
    name: game.nick_name,
    time: new Date(game.end_time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }),
    left,
    center,
    right,
    result: `${left}${center}${right}`
  };

  const { data, error } = await supabase
    .from('results')
    .insert([resultData])
    .select()
    .single();

  if (error) throw error;
  return data;
};
