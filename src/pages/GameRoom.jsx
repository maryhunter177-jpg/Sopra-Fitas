import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Emulator from '../components/Emulator';
import { Calendar, Gamepad, Info, ArrowRight, Download, Upload, RotateCcw, Maximize } from 'lucide-react';

const GameRoom = () => {
  const { gameId } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gameId]);

  const salvarJogo = () => { if (window.EJS_player) window.EJS_player.saveState(); };
  const carregarJogo = () => { if (window.EJS_player) window.EJS_player.loadState(); };
  const reiniciarJogo = () => { if (window.EJS_player) window.EJS_player.restart(); };
  const telaCheia = () => {
    if (window.EJS_player) { try { window.EJS_player.maximize(); } catch (e) { } }
    const elem = document.getElementById('tela-do-jogo');
    if (elem) {
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    }
  };

  const gamesDb = {
    'snes-mario': {
      id: 'snes-mario',
      url: '/supermarioworld.sfc', 
      core: 'snes',
      nome: 'Super Mario World',
      ano: '1990',
      fabricante: 'Nintendo',
      capa: 'https://upload.wikimedia.org/wikipedia/en/3/32/Super_Mario_World_Coverart.png',
      descricao: 'O clássico absoluto que definiu o SNES. Junte-se a Mario e Luigi na Terra dos Dinossauros.'
    },
    'gen-sonic': {
      id: 'gen-sonic',
      url: '/sonicthehedgehog.sms', 
      core: 'segaMS', 
      nome: 'Sonic The Hedgehog (Master System)',
      ano: '1991',
      fabricante: 'SEGA',
      capa: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Sonic_the_Hedgehog_1_Genesis_box_art.jpg',
      descricao: 'A estreia do ouriço mais rápido do mundo nos 8-bits! Corra através da Green Hill Zone.'
    },
    'md-sonic2': {
      id: 'md-sonic2',
      url: '/SonictheHedgehog2.smd', 
      core: 'segaMD', 
      nome: 'Sonic The Hedgehog 2',
      ano: '1992',
      fabricante: 'SEGA',
      capa: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Sonic_2_US_Cover.jpg',
      descricao: 'A sequência lendária que introduziu Tails.'
    },
    'sega-mk3': {
      id: 'sega-mk3',
      url: '/Ultimate Mortal Kombat 3.smd', 
      core: 'segaMD',        
      nome: 'Ultimate Mortal Kombat 3',
      ano: '1995',
      fabricante: 'Midway',
      capa: '/ultimate-mortal-kombat-3-capa.webp',     
      descricao: 'A versão definitiva de MK3! Novos lutadores (Scorpion, Kitana), jogabilidade mais rápida e novos Brutalities.'
    },
    'md-goldenaxe': {
      id: 'md-goldenaxe',
      url: '/goldenaxe.md',
      core: 'segaMD',
      nome: 'Golden Axe',
      ano: '1989',
      fabricante: 'SEGA',
      capa: '/goldenaxe.jpg',
      descricao: 'Em um mundo de fantasia medieval, escolha entre um bárbaro, uma amazona ou um anão e lute contra as forças do malvado Death Adder. Um clássico dos beat-em-up!'
    },
    'md-streetofrage': {
      id: 'md-streetofrage',
      url: '/streetofrage.md',
      core: 'segaMD',                
      nome: 'Streets of Rage',
      ano: '1991',
      fabricante: 'SEGA',
      capa: '/Streets_of_Rage.jpeg', 
      descricao: 'A cidade foi tomada por uma poderosa organização criminosa. Jogue como Axel, Blaze ou Adam e limpe as ruas na base da pancadaria! Trilha sonora lendária de Yuzo Koshiro.'
    },
    // CORRIGIDO AQUI TAMBÉM
    'n64-mario': {
      id: 'n64-mario',
      url: '/mario64.z64',
      core: 'n64',
      nome: 'Super Mario 64',
      ano: '1996',
      fabricante: 'Nintendo',
      capa: '/Super_Mario_64.jpg', 
      descricao: 'A revolução do mundo dos games! O primeiro Mario em 3D definiu o gênero de plataforma. Explore o castelo da Peach, pule em quadros e colete as estrelas.'
    },
    'gba-zelda': {
      id: 'gba-zelda',
      url: '/LegendOfZeldaTheMinishCap.gba', 
      core: 'gba',
      nome: 'The Legend of Zelda: The Minish Cap',
      ano: '2004',
      fabricante: 'Nintendo',
      capa: '/zelda.jpg',
      descricao: 'Link encontra Ezlo, um chapéu falante que o faz encolher. Uma aventura gigante em um mundo minúsculo!'
    },
    'snes-topgear': {
      id: 'snes-topgear',
      url: '/topgear.smc',
      core: 'snes',
      nome: 'Top Gear',
      ano: '1992',
      fabricante: 'Kemco / Gremlin',
      capa: '/Capa_de_Top_Gear.jpg',
      descricao: 'O jogo de corrida mais amado do Brasil! Escolha entre quatro carros, gerencie seu combustível e nitro, e curta uma das melhores trilhas sonoras da história dos videogames.'
    },
    'gb-pokemon': {
      id: 'gb-pokemon',
      url: '/PokémonSilver.gbc', 
      core: 'gb',
      nome: 'Pokémon Silver',
      ano: '1999',
      fabricante: 'Game Freak / Nintendo',
      capa: '/pokemon-silver.jpg',
      descricao: 'Uma jornada épica por Johto e Kanto! Capture novos Pokémon, enfrente a Equipe Rocket e descubra os mistérios de Lugia e Ho-Oh.'
    }
  };

  const jogoAtual = gamesDb[gameId];
  const outrosJogos = Object.values(gamesDb).filter(jogo => jogo.id !== gameId);
  const relacionados = outrosJogos.slice(0, 2);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '100vh', background: '#121212', color: 'white', fontFamily: '"Inter", sans-serif', justifyContent: 'center' }}>
      
      <aside style={{ width: isMobile ? '100%' : '250px', background: '#1e1e1e', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: isMobile ? 'none' : '1px solid #333', borderBottom: isMobile ? '1px solid #333' : 'none', order: isMobile ? 3 : 1 }}>
        <h4 style={{ color: '#555', marginBottom: '10px' }}>Publicidade</h4>
        <div style={{ width: '100%', height: '200px', background: '#252525', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>Ad Space</div>
      </aside>

      <main style={{ flex: 1, minWidth: '320px', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', position: 'relative', order: 2 }}>
        
        {jogoAtual ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             
             <div id="tela-do-jogo" style={{ width: '100%', aspectRatio: '4/3', background: 'black', boxShadow: '0 0 50px rgba(0,0,0,0.8)', borderRadius: '10px 10px 0 0', overflow: 'hidden', border: '2px solid #333', borderBottom: 'none' }}>
                <Emulator gameUrl={jogoAtual.url} core={jogoAtual.core} />
             </div>

             <div style={{ width: '100%', background: '#252525', padding: '10px', borderRadius: '0 0 10px 10px', border: '2px solid #333', borderTop: '1px solid #444', marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={salvarJogo} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#333', color: 'white', border: '1px solid #555', padding: '8px 12px', borderRadius: '5px', fontSize: '0.8rem' }}><Download size={16} /> Salvar</button>
                <button onClick={carregarJogo} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#333', color: 'white', border: '1px solid #555', padding: '8px 12px', borderRadius: '5px', fontSize: '0.8rem' }}><Upload size={16} /> Load</button>
                <button onClick={reiniciarJogo} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#333', color: 'white', border: '1px solid #555', padding: '8px 12px', borderRadius: '5px', fontSize: '0.8rem' }}><RotateCcw size={16} /> Reset</button>
                <button onClick={telaCheia} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#333', color: 'white', border: '1px solid #555', padding: '8px 12px', borderRadius: '5px', fontSize: '0.8rem' }}><Maximize size={16} /> Full</button>
             </div>
             
             <div style={{ width: '100%', background: '#1e1e1e', borderRadius: '15px', padding: '25px', border: '1px solid #333', marginBottom: '30px' }}>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
                    <h1 style={{ fontSize: '1.5rem', margin: 0, color: '#ffc300' }}>{jogoAtual.nome}</h1>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#333', padding: '5px 10px', borderRadius: '20px', fontSize: '0.7rem', color: '#ccc' }}><Calendar size={12} /> {jogoAtual.ano}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#333', padding: '5px 10px', borderRadius: '20px', fontSize: '0.7rem', color: '#ccc' }}><Gamepad size={12} /> {jogoAtual.fabricante}</span>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '30px' }}>
                    <div>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', fontSize: '1rem', marginBottom: '10px' }}><Info size={16} /> Sobre</h3>
                        <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.9rem' }}>{jogoAtual.descricao}</p>
                    </div>
                    {!isMobile && (
                      <div style={{ background: '#252525', padding: '15px', borderRadius: '10px' }}>
                          <h3 style={{ color: '#aaa', fontSize: '1rem', marginBottom: '10px', textAlign: 'center' }}>Comandos (PC)</h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#ddd' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Mover:</span> <span style={{ color: '#ffc300' }}>Setas</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Ação:</span> <span style={{ color: '#ffc300' }}>Z, X, A, S</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Start/Select:</span> <span style={{ color: '#ffc300' }}>Enter / Shift</span></div>
                          </div>
                      </div>
                    )}
                </div>
             </div>
             
             <div style={{ width: '100%', marginTop: '10px' }}>
                <h3 style={{ color: '#aaa', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>Veja também <ArrowRight size={16} /></h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {relacionados.map(jogo => (
                    <Link key={jogo.id} to={`/jogar/${jogo.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ background: '#242038', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #333' }}>
                          <img src={jogo.capa} alt={jogo.nome} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                          <div style={{ overflow: 'hidden' }}>
                            <h4 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{jogo.nome}</h4>
                            <span style={{ fontSize: '0.6rem', color: '#aaa', background: '#121212', padding: '2px 6px', borderRadius: '4px' }}>{jogo.console}</span>
                          </div>
                      </div>
                    </Link>
                  ))}
                </div>
             </div>
          </div>
        ) : (
          <h2>Jogo não encontrado!</h2>
        )}
        <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', color: '#aaa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', background: '#1e1e1e', padding: '8px 15px', borderRadius: '20px', border: '1px solid #333', zIndex: 50 }}><span>←</span></Link>
      </main>

      <aside style={{ width: isMobile ? '100%' : '250px', background: '#1e1e1e', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderLeft: isMobile ? 'none' : '1px solid #333', order: isMobile ? 4 : 3 }}>
        <h4 style={{ color: '#555', marginBottom: '10px' }}>Publicidade</h4>
        <div style={{ width: '100%', height: '200px', background: '#252525', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>Ad Space</div>
      </aside>
    </div>
  );
};

export default GameRoom;