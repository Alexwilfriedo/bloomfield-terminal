import { Play, Clock, Eye, Bookmark, ChevronRight, Tv2, ExternalLink } from "lucide-react";

const C = {
  surface: "#000117",
  elevated: "#000117",
  accent: "#d6b68d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  border: "rgba(44, 61, 127,0.32)",
  purple: "#a78bfa",
  dark: "#000117",
};

const ANALYST_IMG = "https://images.unsplash.com/photo-1758691736490-03d39c292d7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhbmFseXN0JTIwcHJvZmVzc2lvbmFsJTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc3NTY5MTA4NXww&ixlib=rb-4.1.0&q=80&w=400";
const CONF_IMG = "https://images.unsplash.com/photo-1763739530672-4aadafbd81ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjBleGVjdXRpdmUlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc3NTY5MTA4NXww&ixlib=rb-4.1.0&q=80&w=400";
const MARKET_IMG = "https://images.unsplash.com/photo-1691643158804-d3f02eb456a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGRhdGElMjBjaGFydHMlMjB0cmFkaW5nJTIwc2NyZWVuc3xlbnwxfHx8fDE3NzU2OTEwOTB8MA&ixlib=rb-4.1.0&q=80&w=400";

interface VideoCard {
  id: number;
  title: string;
  analyst: string;
  role: string;
  duration: string;
  views: string;
  date: string;
  tag: string;
  tagColor: string;
  thumbnail: string;
  isLive?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
}

const VIDEOS: VideoCard[] = [
  {
    id: 1,
    title: "Flash Marché BRVM — Session du 08 Avril 2026 · Analyse des volumes et flux",
    analyst: "Adjoua Koné",
    role: "Analyste Marchés · Bloomfield",
    duration: "12:34",
    views: "2 847",
    date: "Aujourd'hui",
    tag: "FLASH MARCHÉ",
    tagColor: C.red,
    thumbnail: MARKET_IMG,
    isLive: false,
    isNew: true,
    isPremium: false,
  },
  {
    id: 2,
    title: "Décision BCEAO : Décryptage de la politique monétaire UEMOA et impact sur les taux",
    analyst: "Moussa Ouédraogo",
    role: "Chef Économiste · Bloomfield",
    duration: "28:15",
    views: "1 562",
    date: "08 Avr 2026",
    tag: "MACRO",
    tagColor: C.purple,
    thumbnail: ANALYST_IMG,
    isLive: false,
    isNew: true,
    isPremium: true,
  },
  {
    id: 3,
    title: "Conférence Investisseurs — Résultats FY2025 SONATEL : Lecture Analytique & Valorisation",
    analyst: "Issa Diabaté",
    role: "Senior Research Analyst",
    duration: "45:02",
    views: "4 203",
    date: "07 Avr 2026",
    tag: "RÉSULTATS",
    tagColor: C.green,
    thumbnail: CONF_IMG,
    isLive: false,
    isNew: false,
    isPremium: true,
  },
  {
    id: 4,
    title: "Stratégie Obligataire : Positionnement sur la courbe UEMOA en T2 2026",
    analyst: "Aissatou Bah",
    role: "Fixed Income Strategist",
    duration: "19:48",
    views: "987",
    date: "06 Avr 2026",
    tag: "OBLIGATIONS",
    tagColor: C.orange,
    thumbnail: MARKET_IMG,
    isLive: false,
    isNew: false,
    isPremium: true,
  },
];

// Using orange from JS, not CSS:
const orange = "#fb923c";

function VideoCard({ video }: { video: VideoCard }) {
  return (
    <div
      style={{
        background: "rgba(0, 1, 23,0.5)",
        border: `1px solid ${C.border}`,
        borderRadius: 7,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(214, 182, 141,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          height: 130,
          background: "#000117",
          overflow: "hidden",
        }}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.7,
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 30%, rgba(0, 1, 23,0.85) 100%)",
          }}
        />
        {/* Play button */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(214, 182, 141,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 14px rgba(214, 182, 141,0.4)",
          }}
        >
          <Play size={14} color="#fff" fill="#fff" style={{ marginLeft: 2 }} />
        </div>
        {/* Duration badge */}
        <div
          style={{
            position: "absolute",
            bottom: 7,
            right: 8,
            padding: "2px 6px",
            borderRadius: 3,
            background: "rgba(0, 1, 23,0.85)",
            fontSize: 9,
            fontWeight: 700,
            color: C.text,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {video.duration}
        </div>
        {/* Tags overlay */}
        <div style={{ position: "absolute", top: 7, left: 8, display: "flex", gap: 4 }}>
          {video.isNew && (
            <span
              style={{
                padding: "2px 5px",
                borderRadius: 2,
                background: "rgba(16,200,122,0.85)",
                fontSize: 7.5,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "0.06em",
              }}
            >
              NOUVEAU
            </span>
          )}
          {video.isLive && (
            <span
              style={{
                padding: "2px 5px",
                borderRadius: 2,
                background: "rgba(244,56,96,0.9)",
                fontSize: 7.5,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "0.06em",
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />
              LIVE
            </span>
          )}
          <span
            style={{
              padding: "2px 5px",
              borderRadius: 2,
              background: video.tagColor + "cc",
              fontSize: 7.5,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.05em",
            }}
          >
            {video.tag}
          </span>
        </div>
        {video.isPremium && (
          <div
            style={{
              position: "absolute",
              top: 7,
              right: 8,
              padding: "2px 5px",
              borderRadius: 2,
              background: "rgba(244,185,66,0.9)",
              fontSize: 7.5,
              fontWeight: 800,
              color: "#000117",
              letterSpacing: "0.06em",
            }}
          >
            PREMIUM
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "10px 12px 11px" }}>
        <p
          style={{
            margin: "0 0 7px",
            fontSize: 10.5,
            fontWeight: 600,
            color: C.text,
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {video.title}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d6b68d 0%, #d6b68d 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 7.5,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            {video.analyst.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.dim }}>{video.analyst}</div>
            <div style={{ fontSize: 7.5, color: C.muted }}>{video.role}</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Eye size={8.5} color={C.muted} />
            <span style={{ fontSize: 8.5, color: C.muted }}>{video.views}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Clock size={8.5} color={C.muted} />
            <span style={{ fontSize: 8.5, color: C.muted }}>{video.date}</span>
          </div>
          <div style={{ flex: 1 }} />
          <button
            style={{
              width: 22,
              height: 22,
              borderRadius: 4,
              background: "rgba(0, 1, 23,0.5)",
              border: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: C.muted,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Bookmark size={9} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function VideoSection() {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 7,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(0, 1, 23,0.4)",
        }}
      >
        <Tv2 size={13} color={C.accent} />
        <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>Bloomfield Web TV</span>
        <span style={{ fontSize: 9, color: C.muted }}>· Briefings & Décodages Vidéo</span>
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 7px",
            borderRadius: 3,
            background: "rgba(244,56,96,0.08)",
            border: "1px solid rgba(244,56,96,0.2)",
            fontSize: 8.5,
            color: C.red,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Play size={8} fill={C.red} />
          PROCHAIN LIVE — 16h00
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 9px",
            borderRadius: 4,
            background: "rgba(214, 182, 141,0.08)",
            border: "1px solid rgba(214, 182, 141,0.2)",
            color: C.accent,
            fontSize: 9,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Tous les épisodes
          <ChevronRight size={10} />
        </button>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          padding: 12,
        }}
      >
        {VIDEOS.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
