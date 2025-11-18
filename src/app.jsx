import React, { useState } from 'react';
import { Menu, X, Lock, Star, Clock, ChefHat, Map as MapIcon, Book, Cpu, Globe, Award, ArrowRight, Flame, Users } from 'lucide-react';

// ==================== DATA MODELS ====================

const regions = {
  hsinchu: { id: 'hsinchu', name: 'Hsinchu', nameZh: '新竹', country: 'Taiwan', unlocked: true, position: { x: 50, y: 35 } },
  taipei: { id: 'taipei', name: 'Taipei', nameZh: '台北', country: 'Taiwan', unlocked: false, position: { x: 48, y: 20 } },
  taichung: { id: 'taichung', name: 'Taichung', nameZh: '台中', country: 'Taiwan', unlocked: false, position: { x: 45, y: 50 } },
  tainan: { id: 'tainan', name: 'Tainan', nameZh: '台南', country: 'Taiwan', unlocked: false, position: { x: 40, y: 70 } },
  kaohsiung: { id: 'kaohsiung', name: 'Kaohsiung', nameZh: '高雄', country: 'Taiwan', unlocked: false, position: { x: 42, y: 85 } },
  keelung: { id: 'keelung', name: 'Keelung', nameZh: '基隆', country: 'Taiwan', unlocked: false, position: { x: 52, y: 22 } },
  yilan: { id: 'yilan', name: 'Yilan', nameZh: '宜蘭', country: 'Taiwan', unlocked: false, position: { x: 60, y: 28 } },
  hualien: { id: 'hualien', name: 'Hualien', nameZh: '花蓮', country: 'Taiwan', unlocked: false, position: { x: 65, y: 45 } },
  taitung: { id: 'taitung', name: 'Taitung', nameZh: '台東', country: 'Taiwan', unlocked: false, position: { x: 62, y: 75 } },
  pingtung: { id: 'pingtung', name: 'Pingtung', nameZh: '屏東', country: 'Taiwan', unlocked: false, position: { x: 45, y: 90 } },
  chiayi: { id: 'chiayi', name: 'Chiayi', nameZh: '嘉義', country: 'Taiwan', unlocked: false, position: { x: 42, y: 62 } },
  changhua: { id: 'changhua', name: 'Changhua', nameZh: '彰化', country: 'Taiwan', unlocked: false, position: { x: 43, y: 55 } },
  yunlin: { id: 'yunlin', name: 'Yunlin', nameZh: '雲林', country: 'Taiwan', unlocked: false, position: { x: 40, y: 58 } },
  nantou: { id: 'nantou', name: 'Nantou', nameZh: '南投', country: 'Taiwan', unlocked: false, position: { x: 48, y: 58 } },
  miaoli: { id: 'miaoli', name: 'Miaoli', nameZh: '苗栗', country: 'Taiwan', unlocked: false, position: { x: 47, y: 42 } },
  taoyuan: { id: 'taoyuan', name: 'Taoyuan', nameZh: '桃園', country: 'Taiwan', unlocked: false, position: { x: 46, y: 28 } },
  cp1: { id: 'cp1', name: 'Checkpoint 1', country: 'Taiwan', unlocked: false, position: { x: 49, y: 24 }, isCheckpoint: true },
  cp2: { id: 'cp2', name: 'Checkpoint 2', country: 'Taiwan', unlocked: false, position: { x: 56, y: 38 }, isCheckpoint: true },
  cp3: { id: 'cp3', name: 'Checkpoint 3', country: 'Taiwan', unlocked: false, position: { x: 44, y: 66 }, isCheckpoint: true },
  cp4: { id: 'cp4', name: 'Checkpoint 4', country: 'Taiwan', unlocked: false, position: { x: 50, y: 78 }, isCheckpoint: true },
  cp5: { id: 'cp5', name: 'Checkpoint 5', country: 'Taiwan', unlocked: false, position: { x: 58, y: 68 }, isCheckpoint: true }
};

const dishes = {
  hsinchuRiceNoodles: { id: 'hsinchuRiceNoodles', name: 'Hsinchu Rice Noodles', nameZh: '新竹米粉', regionId: 'hsinchu', prepTime: 30, difficulty: 'Medium', unlocked: true, image: '🍜' },
  meatballSoup: { id: 'meatballSoup', name: 'Hsinchu Meatball Soup', nameZh: '新竹貢丸湯', regionId: 'hsinchu', prepTime: 45, difficulty: 'Easy', unlocked: false, image: '🥣' },
  tempuraUdon: { id: 'tempuraUdon', name: 'Food & Place', nameZh: '天婦羅', regionId: 'hsinchu', prepTime: 40, difficulty: 'Hard', unlocked: false, image: '🍲' },
  oysterOmelet: { id: 'oysterOmelet', name: 'Monkey Dance Island', nameZh: '蚵仔煎', regionId: 'hsinchu', prepTime: 25, difficulty: 'Medium', unlocked: false, image: '🎭' }
};

const culturalModules = {
  identity: { id: 'identity', name: 'Culture & Identity', icon: Book, locked: true },
  history: { id: 'history', name: 'Track History Card', icon: Award, locked: true },
  tech: { id: 'tech', name: 'HanYou Courses', icon: Cpu, locked: true },
  language: { id: 'language', name: 'WMC Sets', icon: Globe, locked: true }
};

// ==================== NAVIGATION BAR ====================

const NavigationBar = ({ activeTab = 'map', onNavigate, showTabs = false }) => {
  const tabs = [
    { id: 'map', label: 'Map', icon: MapIcon },
    { id: 'rewards', label: 'Rewards', icon: Award },
    { id: 'challenges', label: 'Challenges', icon: Star },
    { id: 'profile', label: 'Profile', icon: Users }
  ];

  return (
    <div className="bg-emerald-600 text-white">
      {showTabs && (
        <div className="flex justify-around px-4 py-3">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => tab.id === 'map' ? onNavigate('/map') : null}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ==================== MODAL COMPONENT ====================

const ComingSoonModal = ({ isOpen, onClose, title = "Coming Soon!" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center transform animate-in zoom-in-95 duration-200">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 mb-6 text-lg">
          This feature is currently under development. Keep exploring to unlock new content!
        </p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

// ==================== LANDING PAGE ====================

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-300 via-cyan-200 to-sky-200">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">YouYong's World</h1>
        <button className="p-2 hover:bg-white/30 rounded-lg transition-colors">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </header>

      <div className="px-6 py-8 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight" style={{ 
          textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        }}>
          UNLOCK CULTURAL WORLDS.<br />
          EXPLORE, LEARN, COLLECT
        </h2>
        <button
          onClick={() => onNavigate('/map')}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          START YOUR JOURNEY!
        </button>
      </div>

      <div className="px-6 mb-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-4 border-4 border-amber-300 shadow-xl max-w-2xl mx-auto relative overflow-hidden" style={{ minHeight: '250px' }}>
          {/* Sky background */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sky-200 to-sky-100"></div>
          
          {/* Clouds */}
          <div className="absolute top-4 right-12 text-3xl opacity-80">☁️</div>
          <div className="absolute top-8 right-28 text-2xl opacity-70">☁️</div>
          
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-amber-50"></div>
          
          {/* Buildings in background */}
          <div className="absolute bottom-0 right-8 flex items-end gap-1">
            <div className="w-10 h-20 bg-purple-300 rounded-t-lg border-2 border-purple-400"></div>
            <div className="w-8 h-16 bg-blue-300 rounded-t-lg border-2 border-blue-400"></div>
          </div>
          
          {/* Main content */}
          <div className="relative flex items-center justify-center gap-3 py-6">
            {/* Left children */}
            <div className="flex flex-col gap-3 z-10">
              <div className="w-14 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl border-3 border-yellow-600 shadow-lg">
                👧
              </div>
            </div>
            
            {/* Map board with main character */}
            <div className="relative z-10">
              <div className="w-52 h-44 bg-amber-100 rounded-2xl border-4 border-amber-400 shadow-xl p-4 flex items-center justify-center relative">
                <div className="text-6xl">🗺️</div>
                
                {/* Pin on map */}
                <div className="absolute top-8 left-12 text-2xl">📍</div>
              </div>
              
              {/* Main teacher character overlapping */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-24 h-28 bg-blue-500 rounded-full flex items-center justify-center text-5xl border-4 border-blue-700 shadow-xl z-20">
                👨‍🏫
              </div>
              
              {/* Pen/marker in hand */}
              <div className="absolute -right-2 top-12 text-3xl transform rotate-45 z-30">🖍️</div>
            </div>
            
            {/* Right children */}
            <div className="flex flex-col gap-3 z-10">
              <div className="w-14 h-20 bg-pink-400 rounded-full flex items-center justify-center text-3xl border-3 border-pink-600 shadow-lg">
                👧
              </div>
              <div className="w-14 h-20 bg-amber-400 rounded-full flex items-center justify-center text-3xl border-3 border-amber-600 shadow-lg">
                👦
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 px-6 py-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">CAMTE AND WAGE</h3>
        <h4 className="text-xl font-bold text-gray-800 mb-8 text-center">GO BEYOND IDORIST GUIDES!</h4>
        
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="bg-blue-100 rounded-2xl p-6 border-2 border-blue-300 shadow-md text-center hover:scale-105 transition-transform">
            <div className="text-5xl mb-3">🧠</div>
            <h5 className="font-bold text-gray-800">Go Beyond Treatment</h5>
          </div>
          <div className="bg-yellow-100 rounded-2xl p-6 border-2 border-yellow-300 shadow-md text-center hover:scale-105 transition-transform">
            <div className="text-5xl mb-3">🎯</div>
            <h5 className="font-bold text-gray-800">Senejo Cantsmnge Guides!</h5>
          </div>
          <div className="bg-green-100 rounded-2xl p-6 border-2 border-green-300 shadow-md text-center hover:scale-105 transition-transform">
            <div className="text-5xl mb-3">🍜</div>
            <h5 className="font-bold text-gray-800">Fto Etafá</h5>
          </div>
          <div className="bg-red-100 rounded-2xl p-6 border-2 border-red-300 shadow-md text-center hover:scale-105 transition-transform">
            <div className="text-5xl mb-3">🎪</div>
            <h5 className="font-bold text-gray-800">Kom Aendoae</h5>
          </div>
        </div>
      </div>

      <div className="px-6 py-12">
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="relative group cursor-pointer" onClick={() => onNavigate('/map')}>
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center shadow-lg border-4 border-white group-hover:scale-105 transition-transform">
              <div className="text-5xl mb-2">🇹🇼</div>
              <p className="text-white font-bold text-center">Taiwan</p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gray-400 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center shadow-lg border-4 border-gray-300 opacity-60">
              <Lock className="w-16 h-16 text-gray-600 mb-2" />
              <p className="text-gray-600 font-bold text-center text-sm">China</p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gray-400 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center shadow-lg border-4 border-gray-300 opacity-60">
              <Lock className="w-16 h-16 text-gray-600 mb-2" />
              <p className="text-gray-600 font-bold text-center text-sm">Vietnam</p>
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-4">
          <div className="relative w-1/3 mx-auto">
            <div className="bg-gray-400 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center shadow-lg border-4 border-gray-300 opacity-60">
              <Lock className="w-16 h-16 text-gray-600 mb-2" />
              <p className="text-gray-600 font-bold text-center text-sm">Japan</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white rounded-t-3xl p-6 mt-8 border-t-4 border-gray-200 relative">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center gap-6 mb-4">
            <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <Users className="w-5 h-5 text-gray-700" />
            </button>
            <button className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <span className="text-white font-bold text-xs">𝕏</span>
            </button>
            <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <Globe className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <p className="text-center text-gray-600 text-xs mb-2">
            Cop&you y Tubbie II ❤ uovo
          </p>
          <p className="text-center text-gray-500 text-xs">
            Convergence and universities power! Convergence builds <span className="font-semibold">infousionoids</span>
          </p>
        </div>
        <button className="absolute top-6 right-6 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
          <X className="w-4 h-4 text-gray-700" />
        </button>
      </footer>
    </div>
  );
};

// ==================== WORLD MAP SCREEN ====================

const TaiwanMapSVG = ({ regions, onRegionClick }) => {
  const taiwanPath = "M 35 15 Q 40 12, 45 15 L 55 18 Q 60 20, 62 25 L 68 40 Q 70 50, 68 60 L 65 75 Q 62 85, 55 92 L 45 96 Q 40 98, 35 95 L 30 90 Q 25 85, 25 75 L 22 60 Q 20 50, 22 40 L 25 25 Q 28 18, 35 15 Z";
  const roadPath = "M 50 35 Q 48 30, 48 20 L 52 22 L 60 28 Q 64 35, 65 45 Q 66 55, 62 75 L 50 78 L 42 85 Q 38 82, 40 70 L 42 62 Q 41 55, 43 55 L 45 50 L 47 42 L 48 35 Z";

  return (
    <svg viewBox="0 0 100 120" className="w-full h-full max-w-md mx-auto">
      {/* Taiwan island with mountain details */}
      <path
        d={taiwanPath}
        fill="#86efac"
        stroke="#22c55e"
        strokeWidth="1"
        className="drop-shadow-lg"
      />
      
      {/* Mountain illustrations */}
      <path d="M 45 25 L 48 18 L 51 25 Z" fill="#059669" stroke="#047857" strokeWidth="0.5" />
      <path d="M 40 30 L 43 23 L 46 30 Z" fill="#059669" stroke="#047857" strokeWidth="0.5" />
      <path d="M 50 40 L 53 33 L 56 40 Z" fill="#059669" stroke="#047857" strokeWidth="0.5" />
      
      {/* Road path */}
      <path
        d={roadPath}
        fill="none"
        stroke="#fbbf24"
        strokeWidth="3"
        strokeDasharray="5,5"
        opacity="0.6"
      />
      
      {/* User Avatar (left side) */}
      <g transform="translate(15, 35)">
        <circle cx="0" cy="0" r="10" fill="#fbbf24" opacity="0.3" />
        <circle cx="0" cy="0" r="8" fill="#3b82f6" stroke="white" strokeWidth="2" />
        <text x="0" y="1.5" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">👨‍🎓</text>
      </g>
      
      {/* Mascot Avatar (right side) */}
      <g transform="translate(75, 45)">
        <circle cx="0" cy="0" r="8" fill="white" stroke="#ef4444" strokeWidth="2" />
        <text x="0" y="1.5" textAnchor="middle" fontSize="6">🧑</text>
      </g>
      
      {/* Region stops */}
      {Object.values(regions).map((region) => {
        const isCheckpoint = region.isCheckpoint;
        const size = isCheckpoint ? 6 : 10;
        
        return (
          <g
            key={region.id}
            onClick={() => onRegionClick(region)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            {!region.unlocked && (
              <circle
                cx={region.position.x}
                cy={region.position.y}
                r={size + 2}
                fill="#94a3b8"
                opacity="0.5"
              />
            )}
            <circle
              cx={region.position.x}
              cy={region.position.y}
              r={size}
              fill={region.unlocked ? "#10b981" : "#64748b"}
              stroke="white"
              strokeWidth="2"
              className="drop-shadow-md"
            />
            {region.unlocked && !isCheckpoint && (
              <circle
                cx={region.position.x}
                cy={region.position.y}
                r={3}
                fill="white"
              />
            )}
            {!region.unlocked && (
              <text
                x={region.position.x}
                y={region.position.y + 1.5}
                textAnchor="middle"
                fill="white"
                fontSize="6"
                fontWeight="bold"
              >
                🔒
              </text>
            )}
            {!isCheckpoint && (
              <text
                x={region.position.x}
                y={region.position.y + size + 6}
                textAnchor="middle"
                fill="#1f2937"
                fontSize="4"
                fontWeight="bold"
                className="pointer-events-none"
              >
                {region.nameZh}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

const WorldMapPage = ({ onNavigate, setShowModal }) => {
  const handleRegionClick = (region) => {
    if (region.unlocked && !region.isCheckpoint) {
      onNavigate(`/region/${region.id}`);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-cyan-200">
      {/* Header with app name and menu */}
      <div className="bg-white/20 backdrop-blur-sm px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">YouYong's World</h1>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/30 rounded-lg transition-colors">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <NavigationBar activeTab="map" onNavigate={onNavigate} showTabs={true} />

      <div className="p-4">
        {/* Map Container with avatars */}
        <div className="bg-gradient-to-br from-teal-200 via-cyan-200 to-sky-200 rounded-3xl p-4 shadow-xl border-4 border-white max-w-2xl mx-auto mb-4 relative">
          <TaiwanMapSVG regions={regions} onRegionClick={handleRegionClick} />
          
          {/* Progress Badge */}
          <div className="absolute bottom-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
            Bao's Momohu Naonal 1F: 01% Boxland
          </div>
        </div>

        {/* Locked Worlds */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'China', label: 'Longo', emoji: '🏯' },
              { name: 'Vietnam', label: 'Longo', emoji: '🏞️' },
              { name: 'Japan', label: 'Longo', emoji: '🗾' }
            ].map((world) => (
              <div
                key={world.name}
                onClick={() => setShowModal(true)}
                className="relative cursor-pointer group"
              >
                <div className="bg-gray-500/40 backdrop-blur-sm rounded-3xl p-6 aspect-square flex flex-col items-center justify-center shadow-lg border-4 border-gray-400 group-hover:scale-105 transition-transform">
                  <Lock className="w-12 h-12 text-white mb-2" />
                  <p className="text-white font-bold text-sm text-center">{world.name}</p>
                  <p className="text-white/80 text-xs">{world.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== REGION HUB SCREEN ====================

const RegionHubPage = ({ onNavigate, setShowModal }) => {
  const regionData = regions.hsinchu;
  const regionDishes = Object.values(dishes).filter(d => d.regionId === 'hsinchu');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-amber-50">
      {/* Header with navigation tabs */}
      <div className="bg-white/20 backdrop-blur-sm px-4 py-3 flex justify-between items-center">
        <button onClick={() => onNavigate('/map')} className="text-gray-800 font-bold">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-gray-800">YouYong's World</h1>
        <button className="p-2 hover:bg-white/30 rounded-lg transition-colors">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>
      
      <NavigationBar activeTab="map" onNavigate={onNavigate} showTabs={true} />

      <div className="p-4 max-w-4xl mx-auto">
        {/* City Cityscape Banner */}
        <div className="bg-gradient-to-r from-orange-300 via-red-300 to-pink-300 rounded-3xl overflow-hidden mb-4 shadow-xl border-4 border-white">
          <div className="p-6 text-center relative" style={{ background: 'linear-gradient(to right, #fb923c, #f87171, #fb7185)' }}>
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">FA 隊 Hsinchu</h1>
            
            {/* Illustrated Cityscape */}
            <div className="flex justify-center items-end gap-2 h-24">
              {/* Buildings */}
              <div className="w-12 h-16 bg-blue-400 rounded-t-lg border-2 border-blue-600 relative">
                <div className="absolute top-1 left-1 right-1 grid grid-cols-2 gap-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-yellow-200"></div>
                  ))}
                </div>
              </div>
              
              <div className="w-16 h-20 bg-teal-400 rounded-t-lg border-2 border-teal-600 relative">
                <div className="absolute top-1 left-1 right-1 grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-yellow-200"></div>
                  ))}
                </div>
              </div>
              
              <div className="w-10 h-12 bg-purple-400 rounded-t-lg border-2 border-purple-600 relative">
                <div className="absolute top-1 left-1 right-1 grid grid-cols-2 gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-yellow-200"></div>
                  ))}
                </div>
              </div>
              
              <div className="w-14 h-24 bg-green-400 rounded-t-lg border-2 border-green-600 relative">
                <div className="absolute top-1 left-1 right-1 grid grid-cols-2 gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-yellow-200"></div>
                  ))}
                </div>
              </div>
              
              {/* Wind Turbines */}
              <div className="w-8 h-20 flex flex-col items-center justify-end">
                <div className="w-1 h-16 bg-gray-600"></div>
                <div className="w-6 h-6 text-gray-700">⚙️</div>
              </div>
              
              <div className="w-20 h-18 bg-red-400 rounded-t-lg border-2 border-red-600 relative">
                <div className="absolute top-1 left-1 right-1 grid grid-cols-3 gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-yellow-200"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Banner */}
        <div className="bg-white rounded-2xl p-3 mb-4 shadow-md text-center">
          <p className="text-sm text-gray-600">Hokodo World Progress <span className="font-bold">(0% Complete)</span></p>
        </div>

        {/* Four Module Cards in a Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-gradient-to-br from-green-200 to-emerald-300 rounded-2xl p-4 border-3 border-green-400 shadow-lg hover:scale-105 transition-transform cursor-pointer" onClick={() => setShowModal(true)}>
            <div className="text-4xl text-center mb-2">🏛️</div>
            <h4 className="text-xs font-bold text-center text-gray-800">Cultura & Uskonny</h4>
          </div>
          
          <div className="bg-gradient-to-br from-orange-200 to-amber-300 rounded-2xl p-4 border-3 border-orange-400 shadow-lg hover:scale-105 transition-transform cursor-pointer" onClick={() => setShowModal(true)}>
            <div className="text-4xl text-center mb-2">🕐</div>
            <h4 className="text-xs font-bold text-center text-gray-800">Monkey Dance Pound</h4>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-200 to-amber-300 rounded-2xl p-4 border-3 border-yellow-400 shadow-lg hover:scale-105 transition-transform cursor-pointer" onClick={() => setShowModal(true)}>
            <div className="text-4xl text-center mb-2">🍲</div>
            <h4 className="text-xs font-bold text-center text-gray-800">Freed & Pleuw</h4>
          </div>
          
          <div className="bg-gradient-to-br from-blue-200 to-sky-300 rounded-2xl p-4 border-3 border-blue-400 shadow-lg hover:scale-105 transition-transform cursor-pointer" onClick={() => setShowModal(true)}>
            <div className="text-4xl text-center mb-2">💬</div>
            <h4 className="text-xs font-bold text-center text-gray-800">Language & Comrades</h4>
          </div>
        </div>

        {/* Culture & Track Screen Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Culture & Track Screen</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* HenYchu Engineer Badge - Large Card */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-6 border-4 border-amber-400 shadow-xl min-h-64 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowModal(true)}>
              <Lock className="w-16 h-16 text-gray-400 mb-3" />
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">HenYchu<br/>Engineer Badge</h3>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mt-4">
                <div className="bg-amber-400 h-full w-0"></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">Trust Progress (5/10 Goals Done)</p>
            </div>
          </div>

          {/* Two Vertical Cultural Cards */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {/* HanYou Courses Card */}
              <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-3xl p-4 border-4 border-yellow-400 shadow-lg cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowModal(true)}>
                <div className="flex justify-between items-start mb-3">
                  <div className="text-3xl">👨‍🍳</div>
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <h4 className="font-bold text-sm text-gray-800 mb-2">HanYou Courses</h4>
                <p className="text-xs text-gray-600 mb-3">Dominate Masses of subjects via physical experiences with HanYou</p>
                <div className="text-4xl text-center">🍜</div>
              </div>

              {/* Track History Card */}
              <div className="bg-gradient-to-br from-red-200 to-pink-200 rounded-3xl p-4 border-4 border-red-400 shadow-lg cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowModal(true)}>
                <div className="flex justify-between items-start mb-3">
                  <div className="text-3xl">🎯</div>
                  <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">ENTRY</div>
                </div>
                <h4 className="font-bold text-sm text-gray-800 mb-2">Track History Card</h4>
                <p className="text-xs text-gray-600 mb-3">Reserve to train card game with of added symbology</p>
                <div className="bg-red-600 text-white text-xs px-3 py-2 rounded-full font-bold text-center">WMC Sets<br/>MC's-Sets</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">YouYong XP</p>
              <p className="text-2xl font-bold text-emerald-600">450</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Mastery Badges</p>
              <p className="text-2xl font-bold text-blue-600">1/5</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Card Collection</p>
              <p className="text-2xl font-bold text-purple-600">15/50</p>
            </div>
          </div>
        </div>

        {/* Card Collection Preview */}
        <div className="bg-white rounded-3xl p-6 border-4 border-gray-200 shadow-lg">
          <div className="grid grid-cols-5 gap-3">
            <div className="aspect-[3/4] bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl border-3 border-white shadow-md flex flex-col items-center justify-center p-2">
              <div className="text-2xl mb-1">💻</div>
              <div className="text-xs font-bold text-white text-center">Tech Researcher</div>
              <div className="text-xs text-white/80 text-center mt-1">Episode</div>
            </div>
            {[...Array(9)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-200 rounded-xl border-2 border-gray-300"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================

const App = () => {
  const [currentPage, setCurrentPage] = useState('/');
  const [showModal, setShowModal] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="font-sans">
      {currentPage === '/' && <LandingPage onNavigate={navigate} />}
      {currentPage === '/map' && <WorldMapPage onNavigate={navigate} setShowModal={setShowModal} />}
      {currentPage.startsWith('/region/') && <RegionHubPage onNavigate={navigate} setShowModal={setShowModal} />}
      
      <ComingSoonModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

export default App;