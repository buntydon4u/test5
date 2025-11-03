import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdminGames, publishResult } from '../utils/api';

interface Game {
  id: string;
  nick_name: string;
  start_time: string;
  end_time: string;
  game_type: string;
}

function GameResult() {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState({
    left: '',
    center: '',
    right: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (gameId) {
      fetchGame();
    }
  }, [gameId]);

  const fetchGame = async () => {
    try {
      const games = await getAdminGames();
      const foundGame = games.find((g: Game) => g.id === gameId);
      setGame(foundGame || null);
    } catch (err) {
      setError('Failed to fetch game details');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await publishResult(gameId!, formData.left, formData.center, formData.right);
      alert('Result published successfully!');
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to publish result');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow 2-digit numbers (01-99)
    if (value === '' || (value.length <= 2 && /^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 99)) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="text-yellow-400">Loading game details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-gradient-to-br from-amber-950/70 via-neutral-900 to-amber-950/70 rounded-xl p-8 border-2 border-yellow-600/40 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-yellow-400">Publish Game Result</h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-yellow-400 hover:text-yellow-300 underline"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="mb-6 p-4 bg-neutral-900/50 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">{game.nick_name}</h2>
            <p className="text-gray-400 text-sm">
              {new Date(game.start_time).toLocaleString()} - {new Date(game.end_time).toLocaleString()}
            </p>
            <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${game.game_type === 'prime' ? 'bg-blue-600' : 'bg-green-600'}`}>
              {game.game_type.toUpperCase()}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-yellow-400 mb-4">
                Result Numbers (01-99)
              </label>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <label htmlFor="left" className="block text-sm text-gray-300 mb-2">Left</label>
                  <input
                    type="text"
                    id="left"
                    name="left"
                    value={formData.left}
                    onChange={handleChange}
                    className="w-16 h-16 text-center text-2xl font-bold bg-neutral-800 border-2 border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    maxLength={2}
                    required
                  />
                </div>
                <div className="text-center">
                  <label htmlFor="center" className="block text-sm text-gray-300 mb-2">Center</label>
                  <input
                    type="text"
                    id="center"
                    name="center"
                    value={formData.center}
                    onChange={handleChange}
                    className="w-16 h-16 text-center text-2xl font-bold bg-neutral-800 border-2 border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    maxLength={2}
                    required
                  />
                </div>
                <div className="text-center">
                  <label htmlFor="right" className="block text-sm text-gray-300 mb-2">Right</label>
                  <input
                    type="text"
                    id="right"
                    name="right"
                    value={formData.right}
                    onChange={handleChange}
                    className="w-16 h-16 text-center text-2xl font-bold bg-neutral-800 border-2 border-yellow-600/30 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    maxLength={2}
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 border border-red-600/30 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !formData.left || !formData.center || !formData.right}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Publishing Result...' : 'Publish Result'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GameResult;
