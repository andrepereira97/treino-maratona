"use client";

// pages/index.js - Next.js com design moderno, minimalista e dark mode

import Head from 'next/head';
import { useState } from 'react';

const weeks = [
    // Semanas 1–4 (adaptação)
    { name: "Semana 1 (9–15 março)", days: {Segunda: "ginásio", Terça: "6 km fácil", Quarta: "2 km aquecer + 4×800 m (4:40/km) + 2 km relaxar → 8 km", Quinta: "natação", Sexta: "6 km fácil", Sábado: "10 km longão", Domingo: "enduro"}, total: "30 km" },
    { name: "Semana 2", days: {Segunda: "ginásio", Terça: "8 km fácil", Quarta: "2 km + 5×800 m + 2 km → 9 km", Quinta: "natação", Sexta: "6 km fácil", Sábado: "12 km longão", Domingo: "enduro"}, total: "35 km" },
    { name: "Semana 3", days: {Segunda: "ginásio", Terça: "8 km fácil", Quarta: "2 km + 4 km tempo + 2 km → 8 km", Quinta: "natação", Sexta: "6 km fácil", Sábado: "14 km longão", Domingo: "enduro"}, total: "36 km" },
    { name: "Semana 4 (recuperação)", days: {Segunda: "ginásio", Terça: "6 km fácil", Quarta: "2 km + 6×200 m subida + 2 km → 7 km", Quinta: "natação", Sexta: "6 km fácil", Sábado: "10 km longão", Domingo: "enduro"}, total: "29 km" },

    // Semanas 5–8 (base aeróbica)
    { name: "Semana 5", days: {Segunda: "ginásio", Terça: "8 km", Quarta: "2 km + 5×1 km (4:45) + 2 km → 10 km", Quinta: "natação", Sexta: "7 km", Sábado: "14 km", Domingo: "enduro"}, total: "39 km" },
    { name: "Semana 6", days: {Segunda: "ginásio", Terça: "8 km", Quarta: "2 km + 6 km tempo + 2 km → 10 km", Quinta: "natação", Sexta: "7 km", Sábado: "16 km", Domingo: "enduro"}, total: "41 km" },
    { name: "Semana 7", days: {Segunda: "ginásio", Terça: "9 km", Quarta: "2 km + 6×1 km + 2 km → 11 km", Quinta: "natação", Sexta: "7 km", Sábado: "16 km", Domingo: "enduro"}, total: "43 km" },
    { name: "Semana 8 (recuperação)", days: {Segunda: "ginásio", Terça: "7 km", Quarta: "2 km + 5 km tempo + 2 km → 9 km", Quinta: "natação", Sexta: "6 km", Sábado: "12 km", Domingo: "enduro"}, total: "34 km" },

    // Semanas 9–12
    { name: "Semana 9", days: {Segunda: "ginásio", Terça: "9 km", Quarta: "2 km + 6×1 km + 2 km → 11 km", Quinta: "natação", Sexta: "8 km", Sábado: "18 km", Domingo: "enduro"}, total: "46 km" },
    { name: "Semana 10", days: {Segunda: "ginásio", Terça: "10 km", Quarta: "2 km + 7 km tempo + 2 km → 11 km", Quinta: "natação", Sexta: "8 km", Sábado: "18 km", Domingo: "enduro"}, total: "47 km" },
    { name: "Semana 11", days: {Segunda: "ginásio", Terça: "10 km", Quarta: "2 km + 7×1 km + 2 km → 12 km", Quinta: "natação", Sexta: "8 km", Sábado: "20 km", Domingo: "enduro"}, total: "50 km" },
    { name: "Semana 12 (recuperação)", days: {Segunda: "ginásio", Terça: "8 km", Quarta: "2 km + 5 km tempo + 2 km → 9 km", Quinta: "natação", Sexta: "7 km", Sábado: "14 km", Domingo: "enduro"}, total: "38 km" },

    // Semanas 13–16
    { name: "Semana 13", days: {Segunda: "ginásio", Terça: "10 km", Quarta: "2 km + 8×800 m + 2 km → 11 km", Quinta: "natação", Sexta: "8 km", Sábado: "20 km", Domingo: "enduro"}, total: "49 km" },
    { name: "Semana 14", days: {Segunda: "ginásio", Terça: "10 km", Quarta: "2 km + 8 km tempo + 2 km → 12 km", Quinta: "natação", Sexta: "8 km", Sábado: "22 km", Domingo: "enduro"}, total: "52 km" },
    { name: "Semana 15", days: {Segunda: "ginásio", Terça: "10 km", Quarta: "2 km + 6×1 km + 2 km → 11 km", Quinta: "natação", Sexta: "8 km", Sábado: "22 km", Domingo: "enduro"}, total: "51 km" },
    { name: "Semana 16 (recuperação)", days: {Segunda: "ginásio", Terça: "8 km", Quarta: "2 km + 5 km tempo + 2 km → 9 km", Quinta: "natação", Sexta: "7 km", Sábado: "16 km", Domingo: "enduro"}, total: "40 km" },

    // Semanas 17–22 (fase forte)
    { name: "Semana 17", days: {Segunda: "ginásio", Terça: "10 km", Quarta: "2 km + 7×1 km + 2 km → 12 km", Quinta: "natação", Sexta: "9 km", Sábado: "24 km", Domingo: "enduro"}, total: "55 km" },
    { name: "Semana 18", days: {Segunda: "ginásio", Terça: "10 km", Quarta: "2 km + 9 km tempo + 2 km → 13 km", Quinta: "natação", Sexta: "9 km", Sábado: "24 km", Domingo: "enduro"}, total: "56 km" },
    { name: "Semana 19", days: {Segunda: "ginásio", Terça: "10 km", Quarta: "2 km + 8×1 km + 2 km → 12 km", Quinta: "natação", Sexta: "9 km", Sábado: "26 km", Domingo: "enduro"}, total: "57 km" },
    { name: "Semana 20 (recuperação)", days: {Segunda: "ginásio", Terça: "8 km", Quarta: "2 km + 6 km tempo + 2 km → 10 km", Quinta: "natação", Sexta: "8 km", Sábado: "18 km", Domingo: "enduro"}, total: "44 km" },
    { name: "Semana 21", days: {Segunda: "ginásio", Terça: "11 km", Quarta: "2 km + 8×1 km + 2 km → 13 km", Quinta: "natação", Sexta: "9 km", Sábado: "26 km", Domingo: "enduro"}, total: "59 km" },
    { name: "Semana 22", days: {Segunda: "ginásio", Terça: "11 km", Quarta: "2 km + 10 km ritmo maratona + 2 km → 14 km", Quinta: "natação", Sexta: "9 km", Sábado: "28 km", Domingo: "enduro"}, total: "62 km" },

    // Semanas 23–28 (específico maratona)
    { name: "Semana 23", days: {Segunda: "ginásio", Terça: "11 km", Quarta: "2 km + 8×1 km + 2 km → 13 km", Quinta: "natação", Sexta: "9 km", Sábado: "28 km", Domingo: "enduro"}, total: "61 km" },
    { name: "Semana 24 (recuperação)", days: {Segunda: "ginásio", Terça: "8 km", Quarta: "2 km + 6 km tempo + 2 km → 10 km", Quinta: "natação", Sexta: "8 km", Sábado: "20 km", Domingo: "enduro"}, total: "46 km" },
    { name: "Semana 25", days: {Segunda: "ginásio", Terça: "11 km", Quarta: "2 km + 12 km ritmo maratona + 2 km → 16 km", Quinta: "natação", Sexta: "9 km", Sábado: "30 km", Domingo: "enduro"}, total: "66 km" },
    { name: "Semana 26", days: {Segunda: "ginásio", Terça: "11 km", Quarta: "2 km + 8×1 km + 2 km → 13 km", Quinta: "natação", Sexta: "9 km", Sábado: "28 km", Domingo: "enduro"}, total: "61 km" },
    { name: "Semana 27", days: {Segunda: "ginásio", Terça: "12 km", Quarta: "2 km + 14 km ritmo maratona + 2 km → 18 km", Quinta: "natação", Sexta: "10 km", Sábado: "30 km", Domingo: "enduro"}, total: "70 km" },
    { name: "Semana 28 (recuperação)", days: {Segunda: "ginásio", Terça: "8 km", Quarta: "2 km + 6 km tempo + 2 km → 10 km", Quinta: "natação", Sexta: "8 km", Sábado: "22 km", Domingo: "enduro"}, total: "48 km" },

    // Semanas 29–31
    { name: "Semana 29", days: {Segunda: "ginásio", Terça: "11 km", Quarta: "2 km + 10 km ritmo maratona + 2 km → 14 km", Quinta: "natação", Sexta: "9 km", Sábado: "32 km", Domingo: "enduro"}, total: "66 km" },
    { name: "Semana 30", days: {Segunda: "ginásio", Terça: "10 km", Quarta: "2 km + 8×1 km + 2 km → 12 km", Quinta: "natação", Sexta: "9 km", Sábado: "28 km", Domingo: "enduro"}, total: "59 km" },
    { name: "Semana 31", days: {Segunda: "ginásio", Terça: "10 km", Quarta: "2 km + 8 km ritmo maratona + 2 km → 12 km", Quinta: "natação", Sexta: "8 km", Sábado: "24 km", Domingo: "enduro"}, total: "54 km" },

    // Taper e semanas finais
    { name: "Semana 32", days: {Segunda: "ginásio", Terça: "8 km", Quarta: "2 km + 6 km ritmo maratona + 2 km → 10 km", Quinta: "natação", Sexta: "7 km", Sábado: "20 km", Domingo: "enduro"}, total: "45 km" },
    { name: "Semana 33", days: {Segunda: "ginásio", Terça: "7 km", Quarta: "2 km + 5 km ritmo maratona + 2 km → 9 km", Quinta: "natação", Sexta: "6 km", Sábado: "16 km", Domingo: "enduro"}, total: "38 km" },
    { name: "Semana 34", days: {Segunda: "ginásio", Terça: "6 km", Quarta: "5 km com 3 acelerações", Quinta: "natação", Sexta: "4 km muito leve", Sábado: "descanso", Domingo: "descanso"}, total: "15 km" },

    // Semana da prova
    { name: "Semana da prova (8 novembro 2026)", days: {Segunda: "descanso", Terça: "descanso", Quarta: "descanso", Quinta: "descanso", Sexta: "descanso", Sábado: "descanso", Domingo: "🏁 MARATONA — 42,2 km (Ritmo alvo: 5:20/km)"}, total: "42,2 km" }
];

export default function Home() {
    // Defina o tipo da semana
    type Week = {
      name: string;
      days: {
        Segunda: string;
        Terça: string;
        Quarta: string;
        Quinta: string;
        Sexta: string;
        Sábado: string;
        Domingo: string;
      };
      total: string;
    };

    // State tipado
    const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);

    const navButtonStyle = {
        display: 'block',
        width: '100%',
        marginBottom: '8px',
        padding: '10px',
        background: '#1e1e1e',
        border: '1px solid #444',
        borderRadius: '6px',
        fontWeight: 'bold',
        color: '#eee',
        cursor: 'pointer',
        transition: 'all 0.2s'
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Roboto, Arial, sans-serif', backgroundColor: '#121212', color: '#eee' }}>
            <nav style={{ width: '260px', padding: '20px', borderRight: '1px solid #333', backgroundColor: '#1b1b1b' }}>
                <h2 style={{ color: '#90caf9', marginBottom: '20px' }}>Semanas</h2>
                {weeks.map((week, idx) => (
                    <button key={idx} onClick={() => setSelectedWeek(week)} style={navButtonStyle}>
                        {week.name}
                    </button>
                ))}
            </nav>

            <main style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
                <Head>
                    <title>Plano de Treino Maratona</title>
                </Head>
                <h1 style={{ color: '#90caf9' }}>Plano de Treino Maratona 🏃‍♂️</h1>

                <div style={{ background: '#1e1e1e', padding: '15px', marginBottom: '20px', borderLeft: '4px solid #90caf9', borderRadius: '6px' }}>
                    <h3 style={{ color: '#81c784' }}>Ritmos Guia</h3>
                    <p><span style={{ backgroundColor: '#388e3c', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>Fácil:</span> 5:50–6:20/km | <span style={{ backgroundColor: '#388e3c', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>Longão:</span> 5:45–6:10/km | <span style={{ backgroundColor: '#388e3c', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>Ritmo maratona:</span> 5:20/km | Tempo: ~5:00/km | Séries: 4:20–4:40/km</p>
                </div>

                <div style={{ background: '#1b1b1b', padding: '15px', marginBottom: '20px', borderLeft: '4px solid #fbc02d', borderRadius: '6px' }}>
                    <h3 style={{ color: '#fbc02d' }}>Segunda-feira – Força e potência (pernas + core)</h3>
                    <p><strong>1️⃣ Aquecimento (5–10 min):</strong> Elíptico, passadeira ou bicicleta leve. Mobilidade: agachamentos sem peso, estocadas dinâmicas, rotações de tronco.</p>
                    <p><strong>2️⃣ Pernas – principais:</strong> Agachamento livre 3×8–10 reps, Deadlift romeno 3×8–10 reps, Lunges com halteres 3×10 reps cada perna, Step-ups em banco 3×10 cada perna, Gémeos em pé 3×12–15 reps.</p>
                    <p><strong>3️⃣ Core:</strong> Prancha frontal 3×45–60s, Prancha lateral 3×30–45s cada lado, Pallof press 3×10–12 reps, Glute bridge 3×12–15 reps.</p>
                    <p><strong>Duração total:</strong> 40–50 min</p>

                    <h3 style={{ color: '#fbc02d' }}>Sexta-feira – Estabilidade, core e resistência</h3>
                    <p><strong>1️⃣ Aquecimento (5 min):</strong> Bicicleta ou corrida leve. Mobilidade articular (quadris, tornozelos).</p>
                    <p><strong>2️⃣ Pernas / glúteos – estabilidade:</strong> Single-leg deadlift 3×8 reps cada perna, Hip thrust 3×12 reps, Monster walk 3×12 passos cada direção, Step-ups laterais 3×10 cada perna.</p>
                    <p><strong>3️⃣ Core + equilíbrio:</strong> Prancha frontal com elevação alternada 3×30s, Russian twists 3×15–20 reps, Bird dog 3×12 reps cada lado, Dead bug 3×12 reps.</p>
                    <p><strong>Duração total:</strong> 35–45 min</p>

                    <p style={{ fontSize: '0.9em', color: '#aaa', marginTop: '15px', paddingTop: '10px', borderTop: '1px dashed #333' }}><strong>Notas importantes:</strong> Progressão: aumentar peso ou reps a cada 2–3 semanas mantendo boa forma. Prioridade: qualidade do movimento. Core: mantém postura de corrida, estabilidade pélvica e previne lesões. Alongamento/mobilidade: 5–10 min no final da sessão.</p>
                </div>

                {selectedWeek ? (
                    <div>
                        <h2 style={{ color: '#81c784' }}>{selectedWeek.name}</h2>
                        <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>Dia</th>
                                    <th style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>Treino</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(selectedWeek.days).map(([day, training], idx) => (
                                    <tr key={idx}>
                                        <td style={{ padding: '10px', background: '#1e1e1e', border: '1px solid #444' }}>{day}</td>
                                        <td style={{ padding: '10px', background: '#1e1e1e', border: '1px solid #444' }}>{training}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p><strong>Total corrida:</strong> {selectedWeek.total}</p>
                    </div>
                ) : (
                    <p>Selecione uma semana para ver o treino.</p>
                )}
            </main>
        </div>
    );
}