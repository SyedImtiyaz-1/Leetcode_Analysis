import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const searchAnalysis = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`); // public API
      const data = res.data;

      const easy = data.matchedUserStats.acSubmissionNum.find(i => i.difficulty === 'Easy')?.count || 0;
      const medium = data.matchedUserStats.acSubmissionNum.find(i => i.difficulty === 'Medium')?.count || 0;
      const hard = data.matchedUserStats.acSubmissionNum.find(i => i.difficulty === 'Hard')?.count || 0;

      setStats({
        total: data.totalSolved,
        easy,
        medium,
        hard,
      });

      if (easy < 50) {
        setAnalysis('😐 You are a Decent Coder, you need to work hard!');
      } else if (easy < 100) {
        setAnalysis('🙂 You\'re improving — keep going!');
      } else if (easy < 200) {
        setAnalysis('🚀 You\'re a Good Coder!');
      } else {
        setAnalysis('🔥 You’re a Pro Coder! Keep it up!');
      }
    } catch (err) {
      console.error('Error:', err);
      setStats(null);
      setAnalysis('❌ User not found!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">

      <header className="w-full py-6 bg-gray-800 text-center">
        <h1 className="text-3xl font-bold">Leetcode Analysis</h1>
        <p className="text-sm mt-2 font-light">
          Check whether you are a Casual Coder or a Pro Coder!
        </p>
      </header>

      <main className="flex-grow flex flex-col items-center">
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center w-full px-4 gap-3 sm:gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Leetcode username"
            className="w-full sm:max-w-sm px-4 py-2 rounded-xl text-white border border-white focus:outline-none placeholder-white bg-gray-700"
          />
          <button
            onClick={searchAnalysis}
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-xl cursor-pointer font-semibold flex items-center justify-center"
          >
            Search <FontAwesomeIcon icon={faSearch} className="ml-2" />
          </button>
        </div>

        {loading && (
          <div className="spinner w-12 h-12 border-4 border-t-4 border-yellow-400 border-solid rounded-full animate-spin mx-auto mt-10" />
        )}

        {stats && (
          <div className="mt-10 w-[90%] sm:w-full max-w-2xl bg-white text-black rounded-lg shadow-lg p-6">
            <p className="text-lg font-semibold mb-4 text-center">
              🎯 Total Problems Solved: {stats.total}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-green-100 p-4 rounded-md font-medium break-words">
                🟢 Easy: {stats.easy}
              </div>
              <div className="bg-yellow-100 p-4 rounded-md font-medium break-words">
                🟠 Medium: {stats.medium}
              </div>
              <div className="bg-red-100 p-4 rounded-md font-medium break-words">
                🔴 Hard: {stats.hard}
              </div>
            </div>

            <h3 className="text-center mt-6 font-semibold">{analysis}</h3>
          </div>
        )}
      </main>

      <footer className="w-full py-4 bg-black text-center text-white text-sm">
        Made with ❤️ by <a href="https://linkedin.com/in/imtiyaz-sde" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-400">Imtiyaz</a>
      </footer>
    </div>
  );
}

export default App;


// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import './App.css';

// function App() {
//   function searchAnalysis() {
//     const username = document.getElementById('input').value;
//     const output = document.getElementById('displayOutput');
//     const easy = document.getElementById('easy');
//     const medium = document.getElementById('med');
//     const hard = document.getElementById('hard');
//     const whichCoder = document.getElementById('coder_analysis');

//     axios
//       .get(`https://leetcode-api-faisalshohag.vercel.app/${username}`)
//       .then(function (response) {
//         output.innerHTML = `🎯 Total Problems Solved: ${response.data.totalSolved}`;
//         const diff_easy = response.data.matchedUserStats.acSubmissionNum.find(item => item.difficulty === 'Easy');
//         const diff_med = response.data.matchedUserStats.acSubmissionNum.find(item => item.difficulty === 'Medium');
//         const diff_hard = response.data.matchedUserStats.acSubmissionNum.find(item => item.difficulty === 'Hard');
//         easy.innerHTML = `🟢 Easy: ${diff_easy.count}`;
//         medium.innerHTML = `🟠 Medium: ${diff_med.count}`;
//         hard.innerHTML = `🔴 Hard: ${diff_hard.count}`;

//         if (diff_easy.count < 50) {
//           whichCoder.innerHTML = `😐 You are a Decent Coder, you need to work hard!`;
//         } else if (diff_easy.count < 100) {
//           whichCoder.innerHTML = `🙂 You're improving — keep going!`;
//         } else if (diff_easy.count < 200) {
//           whichCoder.innerHTML = `🚀 You're a Good Coder! You're getting there!`;
//         } else {
//           whichCoder.innerHTML = `🔥 You’re a Pro Coder! Keep it up!`;
//         }
//       })
//       .catch(function (error) {
//         console.error('Error fetching data:', error);
//       });

//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center">
//       <header className="w-full py-6 bg-black text-center">
//         <h1 className="text-3xl font-bold">Leetcode Analysis</h1>
//         <p className="text-sm mt-2 font-light">
//           Check whether you care a Casual Coder or a Pro Coder !!
//         </p>
//       </header>

//       <div className="mt-10 flex flex-col sm:flex-row items-center justify-center w-full px-4 gap-3 sm:gap-2">
//         <input
//           id="input"
//           type="text"
//           placeholder="Enter your Leetcode username"
//           className="w-full sm:max-w-sm px-4 py-2 rounded-xl text-white border border-white focus:outline-none placeholder-white bg-gray-700"
//         />
//         <button
//           onClick={searchAnalysis}
//           className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-xl cursor-pointer font-semibold flex items-center justify-center"
//         >
//           Search <FontAwesomeIcon icon={faSearch} className="ml-2" />
//         </button>
//       </div>

//       <div className="mt-10 w-full max-w-2xl bg-white text-black rounded-lg shadow-lg p-6">
//         <p id="displayOutput" className="text-lg font-semibold mb-4"></p>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
//           <div id="easy" className="bg-green-100 p-4 rounded-md font-medium" />
//           <div id="med" className="bg-yellow-100 p-4 rounded-md font-medium" />
//           <div id="hard" className="bg-red-100 p-4 rounded-md font-medium" />
//         </div>
//         <br />
//         <h3 className='text-center' id='coder_analysis'></h3>
//       </div>
//     </div>
//   );
// }

// export default App;
