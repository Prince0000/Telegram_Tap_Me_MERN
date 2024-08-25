"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const supabaseClient_1 = require("./supabaseClient");
exports.resolvers = {
    Query: {
        getUser: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            // Attempt to fetch the user
            let { data, error } = yield supabaseClient_1.supabase
                .from('users')
                .select('*')
                .eq('username', args.username)
                .single();
            // If the user is not found, create a new user
            if (error && error.code === 'PGRST116') { // PGRST116 indicates a single() query not finding a match
                const { data: newUser, error: insertError } = yield supabaseClient_1.supabase
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
        })
    },
    Mutation: {
        updateUser: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const updates = {};
            if (args.click_per_point !== undefined)
                updates.click_per_point = args.click_per_point;
            if (args.per_click_lavel !== undefined)
                updates.per_click_lavel = args.per_click_lavel;
            if (args.total_coins !== undefined)
                updates.total_coins = args.total_coins;
            if (args.coin_lavel !== undefined)
                updates.coin_lavel = args.coin_lavel;
            if (args.total_clicks !== undefined)
                updates.total_clicks = args.total_clicks;
            if (args.current_clicks !== undefined)
                updates.current_clicks = args.current_clicks;
            const { data, error } = yield supabaseClient_1.supabase
                .from('users')
                .update(updates)
                .eq('username', args.username)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        })
    }
};
