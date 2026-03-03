import { Badge } from "@/components/ui/badge";
import { MapPin, User } from "lucide-react";

interface PersonCardProps {
  name: string;
  constituency?: string;
  bio?: string;
  address?: string;
  phone?: string;
  photoUrl?: string;
  type?: "mla" | "candidate" | "supporter";
  className?: string;
}

export function PersonCard({
  name,
  constituency,
  bio,
  address,
  phone,
  photoUrl,
  type = "mla",
  className = "",
}: PersonCardProps) {
  const typeLabel =
    type === "mla" ? "MLA" : type === "candidate" ? "Candidate" : "Supporter";

  const typeColor =
    type === "mla"
      ? "bg-primary text-primary-foreground"
      : type === "candidate"
        ? "bg-accent text-accent-foreground"
        : "bg-secondary text-secondary-foreground";

  return (
    <div
      className={`bg-card rounded-lg overflow-hidden shadow-party card-hover border border-border ${className}`}
    >
      {/* Photo */}
      <div className="relative h-52 bg-secondary overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200">
            <User className="w-16 h-16 text-navy-400" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-display font-bold px-2.5 py-1 rounded-full ${typeColor}`}
          >
            {typeLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-1 line-clamp-1">
          {name}
        </h3>

        {constituency && (
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
            <span className="line-clamp-1">{constituency}</span>
          </div>
        )}

        {address && (
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-1">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
            <span className="line-clamp-1">{address}</span>
          </div>
        )}

        {phone && (
          <p className="text-sm text-muted-foreground mb-2">📞 {phone}</p>
        )}

        {bio && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mt-2">
            {bio}
          </p>
        )}
      </div>
    </div>
  );
}
