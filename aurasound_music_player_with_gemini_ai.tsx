import React, { useState, useEffect, useRef, useMemo } from "react";

// Custom inline SVG icons to guarantee zero runtime object/component rendering issues

const GEMINI_API_KEY = "";

const PlayIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PauseIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const SkipBackIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
    />
  </svg>
);

const SkipForwardIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.934 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 005 8v8a1 1 0 001.6.8l5.334-4zM19.934 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"
    />
  </svg>
);

const Volume2Icon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
    />
  </svg>
);

const VolumeXIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
    />
  </svg>
);

const ShuffleIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h2m8 0h2a2 2 0 012 2v8a2 2 0 01-2 2h-2m-4-4l-4 4m0-4l4 4"
    />
  </svg>
);

const RepeatIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const HeartIcon = ({ className = "w-4 h-4", filled = false }) => (
  <svg
    className={className}
    fill={filled ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const ShieldCheckIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const ShieldAlertIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const SparklesIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const RadioIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

const PlusIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const SlidersIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
);

const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const FilterIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const Edit3Icon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const BookOpenIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const Mic2Icon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
);

const Loader2Icon = ({ className = "w-4 h-4 animate-spin" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const Wand2Icon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
    />
  </svg>
);

const ListIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 10h16M4 14h16M4 18h16"
    />
  </svg>
);

const MoonIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const ZapIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const INITIAL_TRACKS = [
  {
    id: "1",
    title: "Lofi Chill Study Beat",
    artist: "ChillHop Vibes",
    album: "Study Sessions Vol. 1",
    duration: 165,
    genre: "Lo-Fi",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
    cover:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "♪ Relaxing background beats..." },
      { time: 10, text: "Focus on your thoughts and breathing" },
      { time: 30, text: "Let the ambient rhythm take over" },
      { time: 60, text: "Smooth lo-fi chill vibes" },
      { time: 90, text: "Deep study concentration session" },
      { time: 120, text: "Fading down into calm peaceful mind" },
    ],
    copyrightStatus: {
      status: "Copyright Free",
      details: "Royalty-free track provided by Pixabay Content License.",
      sources: [],
    },
  },
  {
    id: "2",
    title: "Ambient Dreamscape",
    artist: "Celestial Echoes",
    album: "Ethereal Journeys",
    duration: 180,
    genre: "Ambient",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a7315b.mp3?filename=ambient-piano-amp-strings-10711.mp3",
    cover:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "♪ Piano keys gently soft..." },
      { time: 15, text: "Waves of ambient sound drifting across" },
      { time: 45, text: "Floating high above peaceful clouds" },
      { time: 80, text: "Serene echo of harmonic strings" },
      { time: 120, text: "Gentle resolution and warmth" },
    ],
    copyrightStatus: {
      status: "Copyright Free",
      details: "Royalty-free background audio for free commercial use.",
      sources: [],
    },
  },
  {
    id: "3",
    title: "Synthwave Night Drive",
    artist: "Cyber Runner",
    album: "Neon Horizons 1984",
    duration: 195,
    genre: "Electronic",
    url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=synthwave-80s-110045.mp3",
    cover:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "♪ Neon lights glowing in the rain" },
      { time: 20, text: "Cruising down empty midnight highways" },
      { time: 50, text: "Retro 80s analog synthesizer pulse" },
      { time: 90, text: "Feel the speed and energy of light" },
      { time: 140, text: "Fading into dark horizon" },
    ],
    copyrightStatus: {
      status: "Copyright Free",
      details: "CC-0 Creative Commons Public Domain.",
      sources: [],
    },
  },
];

export default function App() {
  const [tracks, setTracks] = useState(INITIAL_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [favorites, setFavorites] = useState(new Set(["1", "3"]));

  // Refs for audio, canvas, and audio context + EQ filter nodes
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);

  const bassFilterRef = useRef(null);
  const midFilterRef = useRef(null);
  const trebleFilterRef = useRef(null);

  // UI Tabs & Audio Settings
  const [activeTab, setActiveTab] = useState("nowPlaying");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLyrics, setShowLyrics] = useState(false);
  const [showEQ, setShowEQ] = useState(false);
  const [eqPreset, setEqPreset] = useState("Balanced");
  const [bassBoost, setBassBoost] = useState(false);

  // Copyright Manager state
  const [copyrightFilter, setCopyrightFilter] = useState("All");

  // Gemini AI States
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiStory, setAiStory] = useState("");
  const [isStoryLoading, setIsStoryLoading] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);

  // Gemini AI Chat, Search Trivia, and Lyric Generator
  const [chatMessages, setChatMessages] = useState([
    {
      role: "model",
      text: "Hey there! I'm Aura DJ, your personal AI music expert. Ask me anything about tracks, music history, or recommendations!",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const [aiTrivia, setAiTrivia] = useState(null);
  const [isTriviaLoading, setIsTriviaLoading] = useState(false);

  const [lyricPrompt, setLyricPrompt] = useState("");
  const [generatedLyrics, setGeneratedLyrics] = useState("");
  const [isLyricsLoading, setIsLyricsLoading] = useState(false);

  // Edit Track & Copyright Checker States
  const [editingTrack, setEditingTrack] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isCheckingCopyright, setIsCheckingCopyright] = useState(false);
  const [copyrightResult, setCopyrightResult] = useState(null);

  // Sleep Timer state
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState(0);
  const [sleepTimeRemaining, setSleepTimeRemaining] = useState(null);

  const currentTrack = useMemo(() => {
    return tracks[currentTrackIndex] || tracks[0];
  }, [tracks, currentTrackIndex]);

  const handleQuickStatusChange = (trackId, newStatus) => {
    setTracks((prev) =>
      prev.map((t) => {
        if (t.id === trackId) {
          return {
            ...t,
            copyrightStatus: {
              ...(t.copyrightStatus || {}),
              status: newStatus,
              details:
                t.copyrightStatus?.details ||
                `Status manually set to ${newStatus}.`,
              sources: t.copyrightStatus?.sources || [],
            },
          };
        }
        return t;
      }),
    );
  };

  const setupAudioContext = () => {
    if (!audioCtxRef.current && audioRef.current) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();

        analyserRef.current = audioCtxRef.current.createAnalyser();
        analyserRef.current.fftSize = 64;

        // Create Biquad filter nodes for real-time EQ adjustment
        const bass = audioCtxRef.current.createBiquadFilter();
        bass.type = "lowshelf";
        bass.frequency.value = 250;
        bassFilterRef.current = bass;

        const mid = audioCtxRef.current.createBiquadFilter();
        mid.type = "peaking";
        mid.frequency.value = 1500;
        mid.Q.value = 1;
        midFilterRef.current = mid;

        const treble = audioCtxRef.current.createBiquadFilter();
        treble.type = "highshelf";
        treble.frequency.value = 4000;
        trebleFilterRef.current = treble;

        sourceRef.current = audioCtxRef.current.createMediaElementSource(
          audioRef.current,
        );

        // Connect chain: source -> bass -> mid -> treble -> analyser -> destination
        sourceRef.current.connect(bass);
        bass.connect(mid);
        mid.connect(treble);
        treble.connect(analyserRef.current);
        analyserRef.current.connect(audioCtxRef.current.destination);
      } catch (err) {
        console.warn("AudioContext setup error / CORS restriction:", err);
      }
    }
  };

  useEffect(() => {
    if (
      !bassFilterRef.current ||
      !midFilterRef.current ||
      !trebleFilterRef.current
    )
      return;

    let bGain = 0;
    let mGain = 0;
    let tGain = 0;

    switch (eqPreset) {
      case "Bass Boost":
        bGain = 8;
        mGain = -2;
        tGain = 1;
        break;
      case "Vocal Accent":
        bGain = -2;
        mGain = 6;
        tGain = 3;
        break;
      case "Relaxed":
        bGain = 4;
        mGain = -1;
        tGain = -4;
        break;
      case "Balanced":
      default:
        bGain = 0;
        mGain = 0;
        tGain = 0;
        break;
    }

    if (bassBoost) {
      bGain += 10; // Powerful deep bass boost enhancement
    }

    bassFilterRef.current.gain.value = bGain;
    midFilterRef.current.gain.value = mGain;
    trebleFilterRef.current.gain.value = tGain;
  }, [eqPreset, bassBoost]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => handleNextTrack();

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [tracks, currentTrackIndex, isShuffle, isRepeat]);

  useEffect(() => {
    if (audioRef.current && currentTrack?.url) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.warn("Playback error:", err));
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (sleepTimerMinutes <= 0) {
      setSleepTimeRemaining(null);
      return;
    }

    setSleepTimeRemaining(sleepTimerMinutes * 60);
    const interval = setInterval(() => {
      setSleepTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (audioRef.current) audioRef.current.pause();
          setIsPlaying(false);
          setSleepTimerMinutes(0);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sleepTimerMinutes]);

  const handleOpenEdit = (track, e) => {
    if (e) e.stopPropagation();
    setEditingTrack({ ...track });
    setCopyrightResult(track.copyrightStatus || null);
    setShowEditModal(true);
  };

  const handleSaveTrackEdit = () => {
    if (!editingTrack) return;
    setTracks((prev) =>
      prev.map((t) =>
        t.id === editingTrack.id
          ? { ...editingTrack, copyrightStatus: copyrightResult }
          : t,
      ),
    );
    setShowEditModal(false);
    setEditingTrack(null);
  };

  const checkCopyrightStatus = async () => {
    if (!editingTrack) return;
    setIsCheckingCopyright(true);
    setCopyrightResult(null);

    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [
              {
                text: `Search the web to determine if the song titled "${editingTrack.title}" by "${editingTrack.artist}" is copyright-free / public domain / royalty-free / Creative Commons, or if it is commercially copyrighted and protected by copyright law. Provide a clear status summary (e.g. "Copyright Free", "Copyrighted / Protected", or "Royalty-Free License") along with a brief explanation and verified sources.`,
              },
            ],
          },
        ],
        tools: [{ google_search: {} }],
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      const candidate = result.candidates?.[0];
      const text =
        candidate?.content?.parts?.[0]?.text ||
        "Unable to determine copyright status.";

      let sources = [];
      const groundingMetadata = candidate?.groundingMetadata;
      if (groundingMetadata && groundingMetadata.groundingAttributions) {
        sources = groundingMetadata.groundingAttributions
          .map((a) => ({ uri: a.web?.uri, title: a.web?.title }))
          .filter((s) => s.uri && s.title);
      }

      const lower = text.toLowerCase();
      let statusTag = "Unknown";
      if (
        lower.includes("copyright free") ||
        lower.includes("public domain") ||
        lower.includes("royalty-free") ||
        lower.includes("creative commons")
      ) {
        statusTag = "Copyright Free";
      } else if (
        lower.includes("commercial") ||
        lower.includes("copyrighted") ||
        lower.includes("protected")
      ) {
        statusTag = "Copyrighted / Protected";
      }

      setCopyrightResult({
        status: statusTag,
        details: text,
        sources: sources,
      });
    } catch (err) {
      console.error("Copyright check error:", err);
      setCopyrightResult({
        status: "Error",
        details: "Failed to verify copyright status.",
        sources: [],
      });
    } finally {
      setIsCheckingCopyright(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const drawVisualizer = () => {
      animationFrameRef.current = requestAnimationFrame(drawVisualizer);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (analyserRef.current && isPlaying) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        const barWidth = (width / bufferLength) * 2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * height * 0.8;

          const gradient = ctx.createLinearGradient(
            0,
            height,
            0,
            height - barHeight,
          );
          gradient.addColorStop(0, "#8b5cf6");
          gradient.addColorStop(0.5, "#ec4899");
          gradient.addColorStop(1, "#3b82f6");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(
              x,
              height - barHeight,
              Math.max(1, barWidth - 3),
              barHeight,
              [4, 4, 0, 0],
            );
          } else {
            ctx.rect(
              x,
              height - barHeight,
              Math.max(1, barWidth - 3),
              barHeight,
            );
          }
          ctx.fill();

          x += barWidth;
        }
      } else {
        const time = Date.now() * 0.003;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(236, 72, 153, 0.4)";

        for (let x = 0; x < width; x += 5) {
          const y =
            height / 2 + Math.sin(x * 0.02 + time) * (isPlaying ? 15 : 5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    drawVisualizer();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlayPause = (forceState) => {
    setupAudioContext();
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    const nextState = forceState !== undefined ? forceState : !isPlaying;
    if (nextState) {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Playback prevented", err);
            setIsPlaying(false);
          });
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    }
  };

  const handleNextTrack = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    if (currentTime > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0;
      return;
    }
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newTracks = files.map((file, idx) => ({
      id: `custom-${Date.now()}-${idx}`,
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "Local Artist",
      album: "Custom Uploads",
      duration: 180,
      genre: "Custom",
      url: URL.createObjectURL(file),
      cover:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
      lyrics: [{ time: 0, text: "Local Audio Track." }],
      copyrightStatus: {
        status: "Unknown",
        details: "Local user upload.",
        sources: [],
      },
    }));

    setTracks((prev) => [...prev, ...newTracks]);
    setCurrentTrackIndex(tracks.length);
    setIsPlaying(true);
  };

  const generateAiPlaylist = async (promptQuery) => {
    const query = promptQuery || aiPrompt;
    if (!query.trim()) return;

    setIsAiLoading(true);
    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [
              {
                text: `Create a curated music playlist of 3 tracks based on this mood or prompt: "${query}". Return valid JSON array of objects with keys: title, artist, album, genre, description.`,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                artist: { type: "STRING" },
                album: { type: "STRING" },
                genre: { type: "STRING" },
                description: { type: "STRING" },
              },
              propertyOrdering: [
                "title",
                "artist",
                "album",
                "genre",
                "description",
              ],
            },
          },
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const parsed = JSON.parse(text);
        const sampleUrls = [
          "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
          "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a7315b.mp3?filename=ambient-piano-amp-strings-10711.mp3",
          "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=synthwave-80s-110045.mp3",
        ];
        const newTracks = parsed.map((item, idx) => ({
          id: `ai-${Date.now()}-${idx}`,
          title: item.title,
          artist: item.artist,
          album: item.album || "AI Vibe Collection",
          duration: 180,
          genre: item.genre || "AI Ambient",
          url: sampleUrls[idx % sampleUrls.length],
          cover:
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
          lyrics: [{ time: 0, text: item.description || "AI Curated Track" }],
          copyrightStatus: {
            status: "Copyright Free",
            details: "Generated royalty-free placeholder stream.",
            sources: [],
          },
        }));

        setTracks((prev) => [...prev, ...newTracks]);
        setActiveTab("library");
        setAiPrompt("");
      }
    } catch (err) {
      console.error("Gemini AI error:", err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const fetchAiLinerNotes = async () => {
    setShowStoryModal(true);
    if (aiStory) return;

    setIsStoryLoading(true);
    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [
              {
                text: `Write an immersive, poetic 2-paragraph background story or "liner notes" for the song "${currentTrack.title}" by artist ${currentTrack.artist} in genre ${currentTrack.genre}. Make it atmospheric and deeply engaging for a music listener.`,
              },
            ],
          },
        ],
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setAiStory(text);
      }
    } catch (err) {
      console.error("Story generation error:", err);
      setAiStory("Could not load AI liner notes at this moment.");
    } finally {
      setIsStoryLoading(false);
    }
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userMsg = chatInput;
    setChatInput("");
    const newHistory = [...chatMessages, { role: "user", text: userMsg }];
    setChatMessages(newHistory);
    setIsChatLoading(true);

    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const contents = newHistory.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const payload = {
        contents: contents,
        systemInstruction: {
          parts: [
            {
              text: "You are Aura DJ, a charismatic, witty, and deeply knowledgeable music expert and DJ companion. Keep responses engaging, concise, and helpful for music lovers.",
            },
          ],
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      const reply =
        result.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm having trouble connecting to the airwaves right now!";

      setChatMessages((prev) => [...prev, { role: "model", text: reply }]);
    } catch (err) {
      console.error("AI chat error:", err);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, I encountered an error connecting to Gemini AI.",
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const fetchSearchGroundedTrivia = async () => {
    setIsTriviaLoading(true);
    setAiTrivia(null);
    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [
              {
                text: `Search the web for fascinating real-time facts, recent news, or history regarding the song "${currentTrack.title}" by "${currentTrack.artist}". Provide a short, captivating trivia card.`,
              },
            ],
          },
        ],
        tools: [{ google_search: {} }],
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      const candidate = result.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text || "No trivia found.";

      let sources = [];
      const groundingMetadata = candidate?.groundingMetadata;
      if (groundingMetadata && groundingMetadata.groundingAttributions) {
        sources = groundingMetadata.groundingAttributions
          .map((a) => ({ uri: a.web?.uri, title: a.web?.title }))
          .filter((s) => s.uri && s.title);
      }

      setAiTrivia({ text, sources });
    } catch (err) {
      console.error("Search trivia error:", err);
      setAiTrivia({
        text: "Could not fetch grounded trivia at this moment.",
        sources: [],
      });
    } finally {
      setIsTriviaLoading(false);
    }
  };

  const generateAiLyrics = async () => {
    if (!lyricPrompt.trim() || isLyricsLoading) return;
    setIsLyricsLoading(true);
    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [
              {
                text: `Write a creative song verse and chorus based on this theme: "${lyricPrompt}". Style it like a professional songwriter.`,
              },
            ],
          },
        ],
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setGeneratedLyrics(text);
      }
    } catch (err) {
      console.error("Lyric generation error:", err);
      setGeneratedLyrics("Error generating lyrics.");
    } finally {
      setIsLyricsLoading(false);
    }
  };

  const genres = ["All", ...Array.from(new Set(tracks.map((t) => t.genre)))];

  const filteredTracks = useMemo(() => {
    return tracks.filter((track) => {
      const matchesGenre =
        selectedGenre === "All" || track.genre === selectedGenre;
      const matchesSearch =
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFav =
        activeTab === "favorites" ? favorites.has(track.id) : true;
      return matchesGenre && matchesSearch && matchesFav;
    });
  }, [tracks, selectedGenre, searchQuery, activeTab, favorites]);

  const copyrightFilteredTracks = useMemo(() => {
    return tracks.filter((t) => {
      const status = t.copyrightStatus?.status || "Unknown";
      if (copyrightFilter === "All") return true;
      return status === copyrightFilter;
    });
  }, [tracks, copyrightFilter]);

  const currentLyricIndex = useMemo(() => {
    if (!currentTrack?.lyrics) return -1;
    for (let i = currentTrack.lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= currentTrack.lyrics[i].time) {
        return i;
      }
    }
    return 0;
  }, [currentTime, currentTrack]);

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden select-none">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-20 blur-3xl scale-125 pointer-events-none"
        style={{ backgroundImage: `url(${currentTrack?.cover})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-slate-950 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-pink-500 to-amber-400 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <RadioIcon className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AuraSound{" "}
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-mono">
                Gemini AI
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Intelligent Audiophile Experience
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
          <button
            onClick={() => setActiveTab("nowPlaying")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "nowPlaying" ? "bg-violet-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
          >
            Now Playing
          </button>
          <button
            onClick={() => setActiveTab("library")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "library" ? "bg-violet-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
          >
            Library
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "favorites" ? "bg-violet-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
          >
            Favorites ({favorites.size})
          </button>
          <button
            onClick={() => setActiveTab("copyrights")}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "copyrights" ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" : "text-emerald-400 hover:text-white"}`}
          >
            <ShieldCheckIcon className="w-3.5 h-3.5" />
            <span>Copyright Manager</span>
          </button>
          <button
            onClick={() => setActiveTab("aiDj")}
            className={`flex items-center space-x-1 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "aiDj" ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md shadow-pink-500/20" : "text-violet-400 hover:text-white"}`}
          >
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>AI DJ Studio</span>
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="audio/*"
            multiple
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 rounded-lg border border-slate-700/50 transition-all shadow-sm"
          >
            <PlusIcon className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Add MP3</span>
          </button>

          <button
            onClick={() => setShowEQ(!showEQ)}
            className={`p-2 rounded-lg border transition-all ${showEQ ? "bg-violet-600 border-violet-500 text-white" : "bg-slate-800/80 border-slate-700/50 text-slate-300 hover:text-white"}`}
            title="Equalizer"
          >
            <SlidersIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col md:flex-row overflow-hidden max-w-7xl w-full mx-auto p-4 md:p-6 gap-6">
        <div className="flex-1 flex flex-col min-h-0 bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-4 md:p-6 shadow-2xl overflow-y-auto">
          {/* Equalizer Overlay */}
          {showEQ && (
            <div className="mb-6 p-4 bg-slate-800/90 rounded-2xl border border-violet-500/30 flex flex-wrap items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center space-x-2">
                <SlidersIcon className="w-5 h-5 text-violet-400" />
                <span className="text-sm font-semibold text-white">
                  Audio EQ Presets & Bass
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {["Balanced", "Bass Boost", "Vocal Accent", "Relaxed"].map(
                  (preset) => (
                    <button
                      key={preset}
                      onClick={() => setEqPreset(preset)}
                      className={`px-3 py-1 rounded-lg text-xs transition-all ${eqPreset === preset ? "bg-violet-600 text-white font-bold" : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"}`}
                    >
                      {preset}
                    </button>
                  ),
                )}
              </div>
              <div className="flex items-center space-x-2 border-l border-slate-700 pl-4">
                <button
                  onClick={() => setBassBoost(!bassBoost)}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${bassBoost ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30" : "bg-slate-700/50 text-slate-400"}`}
                >
                  <ZapIcon className="w-3.5 h-3.5" />
                  <span>Deep Bass</span>
                </button>
              </div>
            </div>
          )}

          {/* Now Playing View */}
          {activeTab === "nowPlaying" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full py-4">
              <div className="relative group my-4">
                <div
                  className={`w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/50 transition-transform duration-500 ${isPlaying ? "scale-105 shadow-violet-500/20" : "scale-100"}`}
                >
                  <img
                    src={currentTrack?.cover}
                    alt={currentTrack?.title}
                    className="w-full h-full object-cover"
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-center p-4 transition-opacity ${isPlaying ? "opacity-100" : "opacity-60"}`}
                  >
                    <div className="flex items-center space-x-1">
                      <span
                        className="w-1.5 h-4 bg-violet-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-7 bg-pink-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-5 bg-amber-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                      <span
                        className="w-1.5 h-8 bg-emerald-400 rounded-full animate-bounce"
                        style={{ animationDelay: "450ms" }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleFavorite(currentTrack?.id)}
                  className={`absolute top-3 right-3 p-3 rounded-full backdrop-blur-md transition-transform active:scale-90 ${favorites.has(currentTrack?.id) ? "bg-pink-600 text-white" : "bg-slate-900/60 text-slate-300 hover:text-white"}`}
                >
                  <HeartIcon
                    className="w-5 h-5"
                    filled={favorites.has(currentTrack?.id)}
                  />
                </button>
              </div>

              <div className="mt-4 space-y-1 w-full px-4">
                <div className="flex items-center justify-center space-x-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white truncate tracking-tight">
                    {currentTrack?.title}
                  </h2>
                  <button
                    onClick={fetchAiLinerNotes}
                    className="p-1.5 bg-violet-600/20 hover:bg-violet-600/40 text-violet-300 rounded-lg border border-violet-500/30 transition-all flex items-center space-x-1 text-xs"
                    title="Generate AI Track Liner Notes"
                  >
                    <BookOpenIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">AI Notes</span>
                  </button>
                </div>
                <p className="text-sm md:text-base text-violet-400 font-medium truncate">
                  {currentTrack?.artist} •{" "}
                  <span className="text-slate-400">{currentTrack?.album}</span>
                </p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <div className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    {currentTrack?.genre}
                  </div>
                  {currentTrack?.copyrightStatus?.status && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        currentTrack.copyrightStatus.status === "Copyright Free"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {currentTrack.copyrightStatus.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Gemini Search Trivia */}
              <div className="w-full mt-4 p-4 bg-slate-900/60 rounded-2xl border border-violet-500/30 text-left">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <SparklesIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">
                      Gemini Search Trivia
                    </span>
                  </div>
                  <button
                    onClick={fetchSearchGroundedTrivia}
                    disabled={isTriviaLoading}
                    className="px-2.5 py-1 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-[10px] font-semibold transition-all disabled:opacity-50 flex items-center space-x-1"
                  >
                    {isTriviaLoading ? (
                      <Loader2Icon className="w-3 h-3 animate-spin" />
                    ) : (
                      <span>Fetch Live Trivia</span>
                    )}
                  </button>
                </div>
                {aiTrivia ? (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {aiTrivia.text}
                    </p>
                    {aiTrivia.sources && aiTrivia.sources.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {aiTrivia.sources.map((src, i) => (
                          <a
                            key={i}
                            href={src.uri}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] bg-slate-800 text-violet-400 px-2 py-0.5 rounded-md hover:underline truncate max-w-[200px]"
                          >
                            🔗 {src.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Click "Fetch Live Trivia" to search the web for real-time
                    background on this track using Google Search grounding.
                  </p>
                )}
              </div>

              <div className="w-full h-16 my-4 bg-slate-950/40 rounded-xl overflow-hidden border border-slate-800/50 p-2 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={60}
                  className="w-full h-full"
                />
              </div>

              <button
                onClick={() => setShowLyrics(!showLyrics)}
                className={`flex items-center space-x-2 text-xs font-medium px-4 py-2 rounded-full border transition-all ${showLyrics ? "bg-violet-600 text-white border-violet-500" : "bg-slate-800/40 text-slate-400 border-slate-700/50 hover:text-white"}`}
              >
                <Mic2Icon className="w-3.5 h-3.5" />
                <span>{showLyrics ? "Hide Lyrics" : "View Timed Lyrics"}</span>
              </button>

              {showLyrics && (
                <div className="w-full mt-4 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 max-h-40 overflow-y-auto space-y-2 text-left">
                  {currentTrack?.lyrics && currentTrack.lyrics.length > 0 ? (
                    currentTrack.lyrics.map((line, idx) => (
                      <p
                        key={idx}
                        className={`text-sm transition-all duration-300 ${idx === currentLyricIndex ? "text-violet-300 font-bold text-base translate-x-1" : "text-slate-500"}`}
                      >
                        {line.text}
                      </p>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 italic text-center">
                      No synchronized lyrics available.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Library & Favorites Views */}
          {(activeTab === "library" || activeTab === "favorites") && (
            <div className="flex-1 flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
                <div className="relative flex-1">
                  <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search library..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-all"
                  />
                </div>

                <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
                  {genres.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGenre(g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${selectedGenre === g ? "bg-violet-600 text-white" : "bg-slate-800/50 text-slate-400 hover:text-slate-200"}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                {filteredTracks.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    No tracks found. Try generating a playlist with AI DJ
                    Studio!
                  </div>
                ) : (
                  filteredTracks.map((track) => {
                    const isCurrent = currentTrack?.id === track.id;
                    return (
                      <div
                        key={track.id}
                        onClick={() => {
                          const realIdx = tracks.findIndex(
                            (t) => t.id === track.id,
                          );
                          setCurrentTrackIndex(realIdx);
                          setIsPlaying(true);
                        }}
                        className={`group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${isCurrent ? "bg-violet-600/20 border-violet-500/40 text-white" : "bg-slate-900/30 border-slate-800/40 hover:bg-slate-800/50 text-slate-300"}`}
                      >
                        <div className="flex items-center space-x-3 truncate">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={track.cover}
                              alt={track.title}
                              className="w-full h-full object-cover"
                            />
                            {isCurrent && isPlaying && (
                              <div className="absolute inset-0 bg-violet-900/60 flex items-center justify-center">
                                <SparklesIcon className="w-5 h-5 text-white animate-spin" />
                              </div>
                            )}
                          </div>
                          <div className="truncate">
                            <h4
                              className={`text-sm font-semibold truncate ${isCurrent ? "text-violet-300" : "text-slate-200"}`}
                            >
                              {track.title}
                            </h4>
                            <p className="text-xs text-slate-400 truncate">
                              {track.artist}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 flex-shrink-0">
                          {track.copyrightStatus?.status && (
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                track.copyrightStatus.status ===
                                "Copyright Free"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              }`}
                            >
                              {track.copyrightStatus.status}
                            </span>
                          )}
                          <span className="text-xs text-slate-500 hidden sm:inline">
                            {track.genre}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {formatTime(track.duration)}
                          </span>
                          <button
                            onClick={(e) => handleOpenEdit(track, e)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs"
                            title="Edit & Check Copyright"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(track.id);
                            }}
                            className={`p-1.5 rounded-full hover:bg-slate-700/50 ${favorites.has(track.id) ? "text-pink-500" : "text-slate-500 hover:text-slate-300"}`}
                          >
                            <HeartIcon
                              className="w-4 h-4"
                              filled={favorites.has(track.id)}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Copyright Manager Feature View */}
          {activeTab === "copyrights" && (
            <div className="flex-1 flex flex-col space-y-5 overflow-y-auto pr-1">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-emerald-500/30">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400">
                    <ShieldCheckIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>Copyright & Licensing Inspector</span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      Manage, categorize, and inspect rights & royalty statuses
                      across your entire audio library.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg font-mono font-semibold">
                    Free:{" "}
                    {
                      tracks.filter(
                        (t) => t.copyrightStatus?.status === "Copyright Free",
                      ).length
                    }
                  </span>
                  <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg font-mono font-semibold">
                    Protected:{" "}
                    {
                      tracks.filter(
                        (t) =>
                          t.copyrightStatus?.status ===
                          "Copyrighted / Protected",
                      ).length
                    }
                  </span>
                  <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg font-mono font-semibold">
                    Unknown:{" "}
                    {
                      tracks.filter(
                        (t) =>
                          !t.copyrightStatus?.status ||
                          t.copyrightStatus?.status === "Unknown",
                      ).length
                    }
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center space-x-1">
                  <FilterIcon className="w-3.5 h-3.5" />
                  <span>Filter Status:</span>
                </span>
                {[
                  "All",
                  "Copyright Free",
                  "Copyrighted / Protected",
                  "Unknown",
                ].map((f) => (
                  <button
                    key={f}
                    onClick={() => setCopyrightFilter(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      copyrightFilter === f
                        ? "bg-emerald-600 text-white shadow-md"
                        : "bg-slate-800/60 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {copyrightFilteredTracks.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    No tracks found matching the copyright status filter "
                    {copyrightFilter}".
                  </div>
                ) : (
                  copyrightFilteredTracks.map((track) => {
                    const status = track.copyrightStatus?.status || "Unknown";
                    const details =
                      track.copyrightStatus?.details ||
                      "No detailed license notes added.";

                    return (
                      <div
                        key={track.id}
                        className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                      >
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <img
                            src={track.cover}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                          />
                          <div className="truncate">
                            <h4 className="text-sm font-bold text-white truncate">
                              {track.title}
                            </h4>
                            <p className="text-xs text-slate-400 truncate">
                              {track.artist} •{" "}
                              <span className="text-slate-500">
                                {track.genre}
                              </span>
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 italic">
                              "{details}"
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap items-center space-x-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-2 md:pt-0 border-slate-800">
                          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                            <button
                              onClick={() =>
                                handleQuickStatusChange(
                                  track.id,
                                  "Copyright Free",
                                )
                              }
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1 ${
                                status === "Copyright Free"
                                  ? "bg-emerald-600 text-white"
                                  : "text-slate-400 hover:text-emerald-400"
                              }`}
                            >
                              <ShieldCheckIcon className="w-3 h-3" />
                              <span>Free</span>
                            </button>
                            <button
                              onClick={() =>
                                handleQuickStatusChange(
                                  track.id,
                                  "Copyrighted / Protected",
                                )
                              }
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1 ${
                                status === "Copyrighted / Protected"
                                  ? "bg-rose-600 text-white"
                                  : "text-slate-400 hover:text-rose-400"
                              }`}
                            >
                              <ShieldAlertIcon className="w-3 h-3" />
                              <span>Protected</span>
                            </button>
                          </div>

                          <button
                            onClick={(e) => handleOpenEdit(track, e)}
                            className="px-3 py-1.5 bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/30 text-violet-300 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all"
                          >
                            <Edit3Icon className="w-3.5 h-3.5" />
                            <span>Edit / AI Check</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* AI DJ Studio Tab */}
          {activeTab === "aiDj" && (
            <div className="flex-1 flex flex-col space-y-6 overflow-y-auto pr-1">
              <div className="text-center space-y-2 py-2">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center shadow-xl shadow-pink-500/20">
                  <Wand2Icon className="w-6 h-6 text-white animate-pulse" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Gemini AI DJ Studio & Chat
                </h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Curate custom playlists, chat live with Aura DJ, or generate
                  original song lyrics.
                </p>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                  AI Playlist Curator
                </h3>
                <textarea
                  rows={2}
                  placeholder="e.g. Late night cyberpunk rain walk in Tokyo..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
                />
                <button
                  onClick={() => generateAiPlaylist()}
                  disabled={isAiLoading || !aiPrompt.trim()}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold text-xs shadow-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                >
                  {isAiLoading ? (
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                  ) : (
                    <SparklesIcon className="w-4 h-4" />
                  )}
                  <span>Generate Playlist</span>
                </button>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col h-64">
                <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">
                  Live Chat with Aura DJ
                </h3>
                <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-slate-950/60 rounded-xl border border-slate-800/80 mb-2 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-2.5 rounded-xl ${msg.role === "user" ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-200"}`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="p-2.5 rounded-xl bg-slate-800 text-slate-400 flex items-center space-x-2">
                        <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
                        <span>Aura DJ is thinking...</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Ask Aura DJ anything about music..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                    className="flex-1 px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                  <button
                    onClick={handleSendChat}
                    disabled={isChatLoading || !chatInput.trim()}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                  AI Songwriting & Lyricist
                </h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter lyric theme (e.g. Stargazing on a summer rooftop)..."
                    value={lyricPrompt}
                    onChange={(e) => setLyricPrompt(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                  <button
                    onClick={generateAiLyrics}
                    disabled={isLyricsLoading || !lyricPrompt.trim()}
                    className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-50 flex items-center space-x-1"
                  >
                    {isLyricsLoading ? (
                      <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <SparklesIcon className="w-3.5 h-3.5" />
                    )}
                    <span>Write</span>
                  </button>
                </div>
                {generatedLyrics && (
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-serif whitespace-pre-line max-h-40 overflow-y-auto">
                    {generatedLyrics}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-80 flex flex-col gap-4">
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-4 shadow-xl flex flex-col flex-1 min-h-[220px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <ListIcon className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Up Next
                </span>
              </div>
              <span className="text-xs text-slate-500">
                {tracks.length} tracks
              </span>
            </div>

            <div className="flex-1 overflow-y-auto mt-3 space-y-2 max-h-60 md:max-h-none">
              {tracks.map((t, index) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setCurrentTrackIndex(index);
                    setIsPlaying(true);
                  }}
                  className={`flex items-center space-x-3 p-2 rounded-xl cursor-pointer text-xs transition-all ${index === currentTrackIndex ? "bg-violet-600/20 text-violet-300 border border-violet-500/30" : "hover:bg-slate-800/40 text-slate-400 hover:text-slate-200"}`}
                >
                  <span className="w-4 text-center font-mono text-slate-500">
                    {index + 1}
                  </span>
                  <img
                    src={t.cover}
                    alt=""
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div className="truncate flex-1">
                    <p className="font-medium truncate text-slate-200">
                      {t.title}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {t.artist}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MoonIcon className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Sleep Timer
                </span>
              </div>
              {sleepTimeRemaining && (
                <span className="text-xs font-mono font-bold text-pink-400 animate-pulse">
                  {formatTime(sleepTimeRemaining)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[0, 15, 30, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setSleepTimerMinutes(mins)}
                  className={`py-1.5 rounded-xl text-xs font-medium transition-all ${sleepTimerMinutes === mins ? "bg-indigo-600 text-white shadow-md" : "bg-slate-800/50 text-slate-400 hover:bg-slate-800"}`}
                >
                  {mins === 0 ? "Off" : `${mins}m`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Edit & Copyright Verification Modal */}
      {showEditModal && editingTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 relative overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Edit Track & Copyright Check</span>
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400">
                  Song Title
                </label>
                <input
                  type="text"
                  value={editingTrack.title}
                  onChange={(e) =>
                    setEditingTrack({ ...editingTrack, title: e.target.value })
                  }
                  className="w-full mt-1 p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">
                  Artist Name
                </label>
                <input
                  type="text"
                  value={editingTrack.artist}
                  onChange={(e) =>
                    setEditingTrack({ ...editingTrack, artist: e.target.value })
                  }
                  className="w-full mt-1 p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">
                  Album / Collection
                </label>
                <input
                  type="text"
                  value={editingTrack.album}
                  onChange={(e) =>
                    setEditingTrack({ ...editingTrack, album: e.target.value })
                  }
                  className="w-full mt-1 p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">
                  Genre
                </label>
                <input
                  type="text"
                  value={editingTrack.genre}
                  onChange={(e) =>
                    setEditingTrack({ ...editingTrack, genre: e.target.value })
                  }
                  className="w-full mt-1 p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-violet-400">
                    Copyright Status Inspector
                  </span>
                  <button
                    type="button"
                    onClick={checkCopyrightStatus}
                    disabled={isCheckingCopyright}
                    className="px-3 py-1 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 disabled:opacity-50"
                  >
                    {isCheckingCopyright ? (
                      <Loader2Icon className="w-3 h-3 animate-spin" />
                    ) : (
                      <SparklesIcon className="w-3 h-3" />
                    )}
                    <span>Run AI Copyright Search</span>
                  </button>
                </div>

                {copyrightResult && (
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400 font-semibold">
                          Status:
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold ${
                            copyrightResult.status === "Copyright Free"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {copyrightResult.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() =>
                            setCopyrightResult({
                              ...copyrightResult,
                              status: "Copyright Free",
                            })
                          }
                          className="px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-300 text-[10px] hover:bg-emerald-600/50"
                        >
                          Set Free
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setCopyrightResult({
                              ...copyrightResult,
                              status: "Copyrighted / Protected",
                            })
                          }
                          className="px-2 py-0.5 rounded bg-rose-600/30 text-rose-300 text-[10px] hover:bg-rose-600/50"
                        >
                          Set Protected
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={copyrightResult.details || ""}
                      onChange={(e) =>
                        setCopyrightResult({
                          ...copyrightResult,
                          details: e.target.value,
                        })
                      }
                      placeholder="Add license notes or details..."
                      className="w-full p-2 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-violet-500 resize-none"
                    />

                    {copyrightResult.sources &&
                      copyrightResult.sources.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-800">
                          {copyrightResult.sources.map((s, idx) => (
                            <a
                              key={idx}
                              href={s.uri}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-violet-400 hover:underline bg-slate-900 px-2 py-0.5 rounded border border-slate-800 truncate max-w-[200px]"
                            >
                              🔗 {s.title}
                            </a>
                          ))}
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveTrackEdit}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Liner Notes Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-violet-500/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <BookOpenIcon className="w-5 h-5 text-violet-400" />
                <h3 className="text-base font-bold text-white">
                  AI Track Liner Notes
                </h3>
              </div>
              <button
                onClick={() => setShowStoryModal(false)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="py-2">
              <h4 className="text-sm font-semibold text-violet-300 mb-1">
                {currentTrack?.title} — {currentTrack?.artist}
              </h4>
              {isStoryLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                  <Loader2Icon className="w-8 h-8 text-violet-500 animate-spin" />
                  <p className="text-xs text-slate-400">
                    Gemini is writing the atmosphere story...
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-serif italic">
                  {aiStory}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowStoryModal(false)}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Player */}
      <footer className="relative z-20 bg-slate-900/80 backdrop-blur-2xl border-t border-slate-800/80 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center space-x-3 w-full md:w-1/4">
            <img
              src={currentTrack?.cover}
              alt={currentTrack?.title}
              className="w-12 h-12 rounded-xl object-cover border border-slate-700/50 flex-shrink-0"
            />
            <div className="truncate">
              <h4 className="text-sm font-semibold text-white truncate">
                {currentTrack?.title}
              </h4>
              <p className="text-xs text-slate-400 truncate">
                {currentTrack?.artist}
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center w-full max-w-xl">
            <div className="flex items-center space-x-6 mb-1">
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={`transition-colors ${isShuffle ? "text-violet-400" : "text-slate-500 hover:text-slate-300"}`}
              >
                <ShuffleIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handlePrevTrack}
                className="text-slate-300 hover:text-white transition-all active:scale-95"
              >
                <SkipBackIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => togglePlayPause()}
                className="w-11 h-11 rounded-full bg-gradient-to-tr from-violet-600 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-violet-500/25 hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying ? (
                  <PauseIcon className="w-5 h-5" />
                ) : (
                  <PlayIcon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleNextTrack}
                className="text-slate-300 hover:text-white transition-all active:scale-95"
              >
                <SkipForwardIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsRepeat(!isRepeat)}
                className={`transition-colors ${isRepeat ? "text-violet-400" : "text-slate-500 hover:text-slate-300"}`}
              >
                <RepeatIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-3 w-full">
              <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500 hover:accent-pink-500 transition-all"
              />
              <span className="text-[10px] font-mono text-slate-400 w-8">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 w-full md:w-1/4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeXIcon className="w-4 h-4 text-pink-400" />
                ) : (
                  <Volume2Icon className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-20 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
