import { Phone, MessageCircle, Trophy, Clock, TrendingUp } from 'lucide-react';

function App() {
  const featuredGames = [
    { name: 'KUSHAN GARH', time: '09:00 PM - 10:15 PM', number: '36', status: 'live' },
    { name: 'WAZIRABAD', time: '09:30 PM - 10:35 PM', number: null, status: 'upcoming' },
    { name: 'ROYAL GOLD', time: '10:00 PM - 11:15 PM', number: null, status: 'upcoming' },
  ];

  const upcomingGames = [
    { name: 'TAJ', time: '11:00 PM - 12:15 AM' },
    { name: 'DELHI BAZAAR DL', time: '11:30 PM - 12:45 AM' },
    { name: 'DELHI NOON', time: '12:00 PM - 01:15 PM' },
  ];

  const results = [
    { name: 'DISAWAR', time: '05:00 AM', left: '26', center: '62', right: '92' },
    { name: 'OLD DELHI', time: '06:00 AM', left: '14', center: '17', right: '30' },
    { name: 'TAJA MORNING', time: '06:30 AM', left: '36', center: '43', right: '33' },
    { name: 'KUSHAN GARH', time: '09:00 PM', left: '26', center: '36', right: '92' },
    { name: 'WAZIRABAD', time: '09:30 PM', left: '14', center: '67', right: '30' },
    { name: 'ROYAL GOLD', time: '10:00 PM', left: '36', center: '63', right: '33' },
    { name: 'TAJ', time: '11:00 PM', result: 'WAIT' },
    { name: 'DELHI BAZAAR DL', time: '11:30 PM', left: '26', center: '62', right: '92' },
    { name: 'DELHI NOON', time: '12:00 PM', left: '14', center: '17', right: '30' },
    { name: 'KASHPUR', time: '01:00 PM', result: 'WAIT' },
    { name: 'PUNJAB DAY', time: '02:00 PM', result: 'WAIT' },
    { name: 'SHRI GANESH', time: '02:30 PM', result: 'WAIT' },
    { name: 'DELHI BAY', time: '03:00 PM', left: '26', center: '62', right: '92' },
    { name: 'FARIDABAD', time: '06:00 PM', result: 'WAIT' },
    { name: 'NEW DELHI', time: '07:00 PM', result: 'WAIT' },
    { name: 'NEW FARIDABAD', time: '08:00 PM', result: 'WAIT' },
    { name: 'PUNJAB SPL', time: '08:30 PM', left: '26', center: '62', right: '92' },
    { name: 'DELHI TIME', time: '09:00 PM', left: '14', center: '17', right: '30' },
    { name: 'DELHI DARBAR', time: '09:30 PM', left: '26', center: '62', right: '92' },
    { name: 'DISAWAR NIGHT', time: '10:00 PM', left: '14', center: '17', right: '30' },
    { name: 'DUBAI NIGHT', time: '11:00 PM', left: '36', center: '63', right: '33' },
    { name: 'GHAZIABAD', time: '11:30 PM', left: '26', center: '62', right: '92' },
    { name: 'GALI', time: '12:00 AM', left: '14', center: '17', right: '30' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      {/* News Ticker */}
      <div className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 py-3 overflow-hidden border-y-2 border-yellow-400/50">
        <div className="marquee whitespace-nowrap text-neutral-900 font-bold text-sm">
          ⭐ Welcome to Satta King Live Results ⭐ Get Latest Updates Here ⭐ 24/7 Support Available ⭐ 100% Accurate Results ⭐ Fast & Secure ⭐ Call Now for Booking ⭐
        </div>
      </div>

      {/* Header */}
      <header className="relative py-8 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-700 rounded-full mb-4 shadow-xl border-4 border-yellow-400/30">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 mb-3" style={{ animation: 'glow 2s ease-in-out infinite' }}>
              SATTA KING
            </h1>
            <div className="flex items-center justify-center gap-2 text-amber-400">
              <TrendingUp className="w-4 h-4" />
              <p className="text-sm font-semibold">Live Results & Fast Updates</p>
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-8">

        {/* Featured Games Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-yellow-500 to-yellow-500 rounded"></div>
            <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Featured Games
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-l from-transparent via-yellow-500 to-yellow-500 rounded"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuredGames.map((game, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-amber-950/50 via-neutral-900/80 to-amber-950/50 rounded-xl p-6 border-2 border-yellow-600/40 transition-all duration-300 hover:scale-105 hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-600/20"
              >
                {game.status === 'live' && (
                  <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse border-2 border-white">
                    LIVE
                  </div>
                )}
                <h3 className="text-yellow-400 font-bold text-xl text-center mb-2">{game.name}</h3>
                <p className="text-center text-gray-400 text-xs mb-4 flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" />
                  {game.time}
                </p>
                {game.number ? (
                  <div className="relative mx-auto w-28 h-28 mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-full animate-pulse opacity-75"></div>
                    <div className="relative bg-gradient-to-br from-red-600 to-red-800 rounded-full w-full h-full flex items-center justify-center border-4 border-yellow-500 shadow-2xl">
                      <span className="text-white text-4xl font-black">{game.number}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-amber-800 to-amber-950 rounded-full w-28 h-28 mx-auto flex items-center justify-center border-4 border-yellow-600/50 shadow-xl mb-4">
                    <span className="text-yellow-400 text-3xl font-bold">?</span>
                  </div>
                )}
                <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 transform hover:-translate-y-0.5">
                  View Chart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Column - Booking Info */}
          <div className="lg:col-span-1 space-y-6">

            {/* Book Now Card */}
            <div className="bg-gradient-to-br from-amber-950/70 via-neutral-900 to-amber-950/70 rounded-xl p-6 border-2 border-yellow-600/40 shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full mb-3 shadow-lg">
                  <span className="text-3xl">👑</span>
                </div>
                <h3 className="text-yellow-400 text-xl font-bold mb-2">SATTA KING SWAP</h3>
                <div className="bg-red-900/40 border border-red-700/50 rounded-lg p-3">
                  <p className="text-white font-semibold text-sm">🚫 क्या आप सट्टे से परेशान है?</p>
                  <p className="text-gray-300 text-xs">तो अपना गेम बुक करवाये</p>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-6">
                <div className="flex items-start gap-2 text-gray-300">
                  <span className="text-yellow-400">✓</span>
                  <span>Online Khaiwal Available</span>
                </div>
                <div className="flex items-start gap-2 text-gray-300">
                  <span className="text-yellow-400">✓</span>
                  <span>All Games Available 24/7</span>
                </div>
                <div className="flex items-start gap-2 text-gray-300">
                  <span className="text-yellow-400">✓</span>
                  <span>Fast Withdrawal System</span>
                </div>
                <div className="flex items-start gap-2 text-gray-300">
                  <span className="text-yellow-400">✓</span>
                  <span>UPI Payment Support</span>
                </div>
                <div className="flex items-start gap-2 text-gray-300">
                  <span className="text-yellow-400">✓</span>
                  <span>Kushan 05 लाख तक</span>
                </div>
                <div className="flex items-start gap-2 text-gray-300">
                  <span className="text-yellow-400">✓</span>
                  <span>Gali Disawar 02 लाख तक</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-neutral-900 font-bold py-3 rounded-lg hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/50 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                  <Phone className="w-5 h-5" />
                  Call Support
                </button>
                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/50 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-yellow-600/30 text-center">
                <p className="text-yellow-400 text-sm font-semibold">Available 24/7</p>
                <p className="text-gray-400 text-xs">+91 98765 43210</p>
              </div>
            </div>

            {/* Upcoming Games */}
            <div className="bg-gradient-to-br from-amber-950/70 via-neutral-900 to-amber-950/70 rounded-xl p-6 border-2 border-yellow-600/40 shadow-xl">
              <h3 className="text-yellow-400 text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Upcoming Games
              </h3>
              <div className="space-y-3">
                {upcomingGames.map((game, index) => (
                  <div key={index} className="bg-neutral-900/50 rounded-lg p-3 border border-yellow-600/20 hover:border-yellow-500/50 transition-colors">
                    <h4 className="text-white font-semibold text-sm">{game.name}</h4>
                    <p className="text-gray-400 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {game.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-amber-950/70 via-neutral-900 to-amber-950/70 rounded-xl p-6 border-2 border-yellow-600/40 shadow-xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-yellow-400 mb-2">Live Results Board</h2>
                <div className="inline-block bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  ● UPDATED LIVE ●
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-neutral-950/80 to-amber-950/40 rounded-lg p-4 border border-yellow-600/30 transition-all duration-300 hover:scale-105 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-600/10"
                  >
                    <h4 className="text-yellow-400 font-bold text-center mb-1 text-sm">
                      {result.name}
                    </h4>
                    <p className="text-center text-gray-500 text-xs mb-3">{result.time}</p>

                    {result.result === 'WAIT' ? (
                      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg py-2 px-4 text-center shadow-lg">
                        <span className="text-white font-bold">{result.result}</span>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg w-14 h-14 flex items-center justify-center border-2 border-yellow-500/50 shadow-md hover:scale-110 transition-transform cursor-pointer">
                          <span className="text-white font-bold text-lg">{result.left}</span>
                        </div>
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg w-14 h-14 flex items-center justify-center border-2 border-yellow-500/50 shadow-md hover:scale-110 transition-transform cursor-pointer">
                          <span className="text-white font-bold text-lg">{result.center}</span>
                        </div>
                        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg w-14 h-14 flex items-center justify-center border-2 border-yellow-500/50 shadow-md hover:scale-110 transition-transform cursor-pointer">
                          <span className="text-white font-bold text-lg">{result.right}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <section className="bg-gradient-to-r from-amber-900/50 via-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-600/40 text-center shadow-2xl">
          <h3 className="text-2xl font-bold text-yellow-400 mb-3">Ready to Start Playing?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            अभी कॉल करें और अपना खाता खुलवाएं। सभी गेम उपलब्ध हैं। Fast withdrawal और secure payment के साथ।
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-gradient-to-r from-yellow-500 to-amber-600 text-neutral-900 font-bold px-8 py-3 rounded-lg hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/50 flex items-center gap-2 transform hover:-translate-y-0.5">
              <Phone className="w-5 h-5" />
              Call Now: +91 98765 43210
            </button>
            <button className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold px-8 py-3 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/50 flex items-center gap-2 transform hover:-translate-y-0.5">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Support
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-transparent to-amber-950/30 py-8 mt-12 border-t border-yellow-600/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-3">
            <p className="text-yellow-400 font-semibold">© 2024 Satta King Live Results. All Rights Reserved.</p>
            <p className="text-gray-500 text-sm">Play Responsibly | 18+ Only | Gambling Can Be Addictive</p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
              <span>Terms & Conditions</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Responsible Gaming</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
