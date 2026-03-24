// app/page.tsx
'use client';

import { useState } from 'react';

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

const weeks = [
    // Semanas 1–4 (adaptação)
    { name: "Semana 1 (9–15 março)", days: {Segunda: "ginásio", Terça: "99 km fácil", Quarta: "2 km aquecer + 4×800 m (4:40/km) + 2 km relaxar → 8 km", Quinta: "natação", Sexta: "6 km fácil", Sábado: "10 km longão", Domingo: "enduro"}, total: "30 km" },
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
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);

  return (
    <div className="container">
      <header className="header">
        <h1>Plano de Treino Maratona 🏃‍♂️</h1>

        <select
          className="week-select"
          value={selectedWeek?.name || ''}
          onChange={(e) =>
            setSelectedWeek(weeks.find((w) => w.name === e.target.value) || null)
          }
        >
          <option value="">Selecione a semana</option>
          {weeks.map((week) => (
            <option key={week.name} value={week.name}>
              {week.name}
            </option>
          ))}
        </select>
      </header>

      <main className="main">
        {/* Ritmos guia */}
        <div className="card">
          <h2>Ritmos Guia</h2>
          <p>
            <strong>Fácil:</strong> 5:50–6:20/km |{' '}
            <strong>Longão:</strong> 5:45–6:10/km |{' '}
            <strong>Ritmo maratona:</strong> 5:20/km |{' '}
            <strong>Tempo:</strong> ~5:00/km | <strong>Séries:</strong> 4:20–4:40/km
          </p>
        </div>

        {/* Treinos de ginásio */}
        <div className="card">
          <h2>Segunda-feira – Força e potência (pernas + core)</h2>
          <p>
            <strong>1️⃣ Aquecimento (5–10 min):</strong> Elíptico, passadeira ou bicicleta leve. Mobilidade: agachamentos sem peso, estocadas dinâmicas, rotações de tronco.
          </p>
          <p>
            <strong>2️⃣ Pernas – principais:</strong> Agachamento livre 3×8–10 reps, Deadlift romeno 3×8–10 reps, Lunges com halteres 3×10 reps cada perna, Step-ups em banco 3×10 cada perna, Gémeos em pé 3×12–15 reps.
          </p>
          <p>
            <strong>3️⃣ Core:</strong> Prancha frontal 3×45–60s, Prancha lateral 3×30–45s cada lado, Pallof press 3×10–12 reps, Glute bridge 3×12–15 reps.
          </p>
          <p>Duração total: 40–50 min</p>

          <h2>Sexta-feira – Estabilidade, core e resistência</h2>
          <p>
            <strong>1️⃣ Aquecimento (5 min):</strong> Bicicleta ou corrida leve. Mobilidade articular (quadris, tornozelos).
          </p>
          <p>
            <strong>2️⃣ Pernas / glúteos – estabilidade:</strong> Single-leg deadlift 3×8 reps cada perna, Hip thrust 3×12 reps, Monster walk 3×12 passos cada direção, Step-ups laterais 3×10 cada perna.
          </p>
          <p>
            <strong>3️⃣ Core + equilíbrio:</strong> Prancha frontal com elevação alternada 3×30s, Russian twists 3×15–20 reps, Bird dog 3×12 reps cada lado, Dead bug 3×12 reps.
          </p>
          <p>Duração total: 35–45 min</p>

          <p className="notes">
            Notas importantes: Progressão: aumentar peso ou reps a cada 2–3 semanas mantendo boa forma. Prioridade: qualidade do movimento. Core: mantém postura de corrida, estabilidade pélvica e previne lesões. Alongamento/mobilidade: 5–10 min no final da sessão.
          </p>
        </div>

        {/* Semana selecionada */}
        {selectedWeek ? (
          <div className="card">
            <h2>{selectedWeek.name}</h2>
            <table className="week-table">
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Treino</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedWeek.days).map(([day, training]) => (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>{training}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Total corrida: {selectedWeek.total}</p>
          </div>
        ) : (
          <p>Selecione uma semana para ver o treino.</p>
        )}
      </main>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #121212;
          color: #eee;
          font-family: 'Roboto', sans-serif;
          padding: 0 10px;
        }
        .header {
          padding: 15px 0;
          text-align: center;
        }
        .week-select {
          width: 100%;
          padding: 10px;
          font-size: 1rem;
          margin-top: 10px;
          border-radius: 6px;
          border: 1px solid #444;
          background-color: #1e1e1e;
          color: #eee;
        }
        .main {
          flex: 1;
          padding: 15px 0;
        }
        .card {
          background-color: #1b1b1b;
          padding: 15px;
          border-radius: 6px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
          margin-bottom: 20px;
        }
        .week-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        .week-table th,
        .week-table td {
          padding: 10px;
          border: 1px solid #444;
        }
        .week-table th {
          background-color: #333;
        }
        .notes {
          font-size: 0.9rem;
          color: #aaa;
          margin-top: 10px;
          border-top: 1px dashed #333;
          padding-top: 10px;
        }
        @media (min-width: 768px) {
          .container {
            flex-direction: row;
          }
          .header {
            width: 250px;
            flex-shrink: 0;
          }
          .main {
            flex: 1;
            padding-left: 20px;
          }
        }
      `}</style>
    </div>
  );
}
