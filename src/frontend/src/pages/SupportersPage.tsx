import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllSupporters } from "@/hooks/useQueries";
import { Heart, MapPin, Phone, User, Users } from "lucide-react";
import { motion } from "motion/react";
import type { Supporter } from "../backend.d";

function SupporterCard({
  supporter,
  index,
}: { supporter: Supporter; index: number }) {
  const photoUrl = supporter.photo?.getDirectURL?.();

  const joinedDate = supporter.joinedAt
    ? new Date(Number(supporter.joinedAt)).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-ocid={`supporters.item.${index + 1}`}
      className="bg-card rounded-lg overflow-hidden shadow-xs card-hover border border-border flex flex-col"
    >
      <div className="relative h-44 bg-secondary overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={supporter.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-50 to-navy-100">
            <User className="w-12 h-12 text-navy-300" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 text-navy-800 text-xs font-display font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Heart className="w-3 h-3 text-accent fill-accent" />
            Supporter
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display font-bold text-base text-foreground leading-tight mb-2">
          {supporter.name}
        </h3>

        {supporter.address && (
          <div className="flex items-start gap-1.5 text-sm text-muted-foreground mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2 leading-snug">
              {supporter.address}
            </span>
          </div>
        )}

        {supporter.phone && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1.5">
            <Phone className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            <span>{supporter.phone}</span>
          </div>
        )}

        {joinedDate && (
          <div className="mt-auto pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground">
              Joined {joinedDate}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SupporterSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border shadow-xs">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function SupportersPage() {
  const { data: supporters, isLoading, isError } = useGetAllSupporters();

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-navy-700 to-navy-900 py-14 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 saffron-gradient" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-accent font-body text-sm font-semibold uppercase tracking-wider">
                Our Community
              </span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-3">
              Our Supporters
            </h1>
            <p className="text-white/70 font-body text-lg max-w-xl">
              The backbone of BOROLA Party — thousands of dedicated individuals
              who believe in our vision and stand with us.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {isLoading ? (
          <div
            data-ocid="supporters.loading_state"
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          >
            {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"].map(
              (k) => (
                <SupporterSkeleton key={k} />
              ),
            )}
          </div>
        ) : isError ? (
          <div data-ocid="supporters.error_state" className="text-center py-20">
            <p className="text-destructive font-body">
              Failed to load supporters. Please try again.
            </p>
          </div>
        ) : supporters && supporters.length === 0 ? (
          <div data-ocid="supporters.empty_state" className="text-center py-24">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-5">
              <Users className="w-9 h-9 text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              No Supporters Yet
            </h3>
            <p className="text-muted-foreground font-body mb-6">
              Be the first to join the BOROLA Party community!
            </p>
            <a
              href="/join"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-display font-bold px-6 py-3 rounded-md shadow-saffron hover:bg-accent/90 transition-colors"
            >
              <Heart className="w-4 h-4" />
              Join Now
            </a>
          </div>
        ) : (
          <div
            data-ocid="supporters.list"
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          >
            {(supporters ?? []).map((supporter, i) => (
              <SupporterCard
                key={String(supporter.id)}
                supporter={supporter}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
