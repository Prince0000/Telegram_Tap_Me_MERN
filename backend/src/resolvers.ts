import { supabase } from './supabaseClient';

export const resolvers = {
  Query: {
    getUser: async (_parent: any, args: { username: string }) => {
      // Attempt to fetch the user
      let { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', args.username)
        .single();

      // If the user is not found, create a new user
      if (error && error.code === 'PGRST116') { // PGRST116 indicates a single() query not finding a match
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([
            {
              username: args.username,
              click_per_point: 1,
              per_click_lavel: 1,
              total_coins: 0,
              coin_lavel: 1,
              total_clicks: 1000,
              current_clicks: 1000
            }
          ])
          .select()
          .single();

        if (insertError) {
          throw new Error(insertError.message);
        }

        return newUser;
      }

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }
  },
  Mutation: {
    updateUser: async (_parent: any, args: { username: string; click_per_point?: number; per_click_lavel?: number; total_coins?: number; coin_lavel?: number; total_clicks?: number; current_clicks?: number }) => {
      const updates: Partial<{
        click_per_point: number;
        per_click_lavel: number;
        total_coins: number;
        coin_lavel: number;
        total_clicks: number;
        current_clicks: number;
      }> = {};

      if (args.click_per_point !== undefined) updates.click_per_point = args.click_per_point;
      if (args.per_click_lavel !== undefined) updates.per_click_lavel = args.per_click_lavel;
      if (args.total_coins !== undefined) updates.total_coins = args.total_coins;
      if (args.coin_lavel !== undefined) updates.coin_lavel = args.coin_lavel;
      if (args.total_clicks !== undefined) updates.total_clicks = args.total_clicks;
      if (args.current_clicks !== undefined) updates.current_clicks = args.current_clicks;

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('username', args.username)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }
  }
};
