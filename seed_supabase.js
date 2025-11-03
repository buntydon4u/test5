const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const seedData = async () => {
  try {
    console.log('Starting Supabase seeding...');

    // Clear existing data
    await supabase.from('games').delete().neq('id', 0);
    await supabase.from('results').delete().neq('id', 0);
    await supabase.from('users').delete().neq('id', 0);
    console.log('Cleared existing data');

    // Create admin user (Note: Supabase auth handles users differently, this is for a users table if needed)
    // For Supabase, authentication is handled via auth.users, but if you have a custom users table:
    const { data: adminUser, error: userError } = await supabase
      .from('users')
      .insert({
        username: 'admin',
        password: 'admin123', // Note: In production, hash passwords
        role: 'admin'
      })
      .select();

    if (userError) {
      console.error('Error creating admin user:', userError);
    } else {
      console.log('Admin user created:', adminUser);
    }

    // Seed Games and Results from October 1st to 18th, 2025
    const year = 2025;
    const month = 9; // October (0-based index)
    const startDay = 1;
    const endDay = 18;

    const gamesData = [];
    const resultsData = [];

    // Game templates with relative hours from start of day
    const gameTemplates = [
      { nickName: 'Delhi Bazar', startHour: 13, duration: 1, gameType: 'prime' }, // 1 PM - 2 PM
      { nickName: 'Shri Ganesh', startHour: 14, duration: 1, gameType: 'prime' }, // 2 PM - 3 PM
      { nickName: 'Faridabad', startHour: 15, duration: 1, gameType: 'prime' }, // 3 PM - 4 PM
      { nickName: 'Ghaziabad', startHour: 16, duration: 1, gameType: 'prime' }, // 4 PM - 5 PM
      { nickName: 'Gali', startHour: 17, duration: 1, gameType: 'prime' }, // 5 PM - 6 PM
      { nickName: 'Disawar', startHour: 18, duration: 1, gameType: 'prime' }, // 6 PM - 7 PM
      { nickName: 'Super Royal', startHour: 19, duration: 1, gameType: 'local' }, // 7 PM - 8 PM
      { nickName: 'Chandigarh', startHour: 20, duration: 1, gameType: 'local' }, // 8 PM - 9 PM
      { nickName: 'Kishangarh', startHour: 21, duration: 1, gameType: 'local' }, // 9 PM - 10 PM
    ];

    for (let day = startDay; day <= endDay; day++) {
      const date = new Date(year, month, day);

      gameTemplates.forEach(template => {
        const startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), template.startHour, 0, 0);
        const endTime = new Date(startTime.getTime() + template.duration * 60 * 60 * 1000);

        gamesData.push({
          nickName: template.nickName,
          startTime: startTime.toISOString(),
          end_time: endTime.toISOString(),
          isActive: true,
          gameType: template.gameType
        });

        // Generate result for each game
        const result = Math.floor(Math.random() * 99 + 1).toString().padStart(2, '0'); // 01-99

        resultsData.push({
          name: template.nickName,
          time: startTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          left: result,
          center: result,
          right: result,
          result,
          created_at: endTime.toISOString() // Set created_at to endTime for historical data
        });
      });
    }

    const { data: games, error: gamesError } = await supabase
      .from('games')
      .insert(gamesData)
      .select();

    if (gamesError) {
      console.error('Error seeding games:', gamesError);
    } else {
      console.log(`Games seeded successfully: ${games.length} games`);
    }

    const { data: results, error: resultsError } = await supabase
      .from('results')
      .insert(resultsData)
      .select();

    if (resultsError) {
      console.error('Error seeding results:', resultsError);
    } else {
      console.log(`Results seeded successfully: ${results.length} results`);
    }

    console.log('Supabase database seeded successfully!');
  } catch (error) {
    console.error('Error seeding Supabase database:', error);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;
