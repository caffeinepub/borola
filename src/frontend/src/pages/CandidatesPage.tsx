import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllCandidates } from "@/hooks/useQueries";
import { MapPin, User, UserCheck } from "lucide-react";
import { motion } from "motion/react";
import type { Candidate } from "../backend.d";

const SAMPLE_CANDIDATES: Candidate[] = [
  {
    id: BigInt(1),
    name: "Anita Devi Borola",
    constituency: "South Rangpur",
    bio: "Dynamic youth leader and grassroots activist. Former president of the district youth wing. Committed to modernizing local governance and bringing digital infrastructure to rural areas.",
    photo: {
      getDirectURL: () => "",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: () => ({}) as any,
    } as any,
  },
  {
    id: BigInt(2),
    name: "Suresh Chandra Patel",
    constituency: "Central Vikaspur",
    bio: "Civil engineer and community builder. Author of the regional development blueprint. Advocates for sustainable urban planning and clean energy initiatives.",
    photo: {
      getDirectURL: () => "",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: () => ({}) as any,
    } as any,
  },
  {
    id: BigInt(3),
    name: "Fatima Begum",
    constituency: "West Noorpur",
    bio: "Healthcare professional and women's rights advocate. Served 15 years as a district health officer. Determined to expand healthcare access and reform the education system.",
    photo: {
      getDirectURL: () => "",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: () => ({}) as any,
    } as any,
  },
];

function CandidateCard({
  candidate,
  index,
}: { candidate: Candidate; index: number }) {
  const photoUrl = candidate.photo?.getDirectURL?.();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-ocid={`candidates.item.${index + 1}`}
      className="bg-card rounded-lg overflow-hidden shadow-party card-hover border border-border"
    >
      <div className="relative h-56 bg-secondary overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={candidate.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-saffron-50 to-saffron-100">
            <User className="w-16 h-16 text-saffron-400" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-accent text-accent-foreground text-xs font-display font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <UserCheck className="w-3 h-3" />
            Candidate
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-1.5">
          {candidate.name}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
          <span className="line-clamp-1">{candidate.constituency}</span>
        </div>
        <div className="h-px bg-border mb-3" />
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {candidate.bio}
        </p>
      </div>
    </motion.div>
  );
}

function CandidateSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border shadow-xs">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="p-5 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full mt-3" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function CandidatesPage() {
  const { data: candidates, isLoading, isError } = useGetAllCandidates();

  const displayData =
    candidates && candidates.length > 0 ? candidates : SAMPLE_CANDIDATES;
  const isPlaceholder = !candidates || candidates.length === 0;

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-saffron-600 to-saffron-700 py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
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
              <UserCheck className="w-5 h-5 text-white/80" />
              <span className="text-white/80 font-body text-sm font-semibold uppercase tracking-wider">
                Election Candidates
              </span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-3">
              Our Candidates
            </h1>
            <p className="text-white/80 font-body text-lg max-w-xl">
              Meet the BOROLA Party candidates standing for election to
              represent and serve their constituencies.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {isLoading ? (
          <div
            data-ocid="candidates.loading_state"
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
              <CandidateSkeleton key={k} />
            ))}
          </div>
        ) : isError ? (
          <div data-ocid="candidates.error_state" className="text-center py-20">
            <p className="text-destructive font-body">
              Failed to load candidates. Please try again.
            </p>
          </div>
        ) : (
          <>
            {isPlaceholder && (
              <div className="mb-6 px-4 py-3 bg-accent/10 border border-accent/20 rounded-md">
                <p className="text-sm text-accent-foreground/80 font-body">
                  Showing sample data — no candidates have been added yet.
                </p>
              </div>
            )}
            <div
              data-ocid="candidates.list"
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {displayData.map((candidate, i) => (
                <CandidateCard
                  key={String(candidate.id)}
                  candidate={candidate}
                  index={i}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
