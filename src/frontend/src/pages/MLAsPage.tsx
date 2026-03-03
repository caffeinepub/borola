import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllMLAs } from "@/hooks/useQueries";
import { Award, MapPin, User } from "lucide-react";
import { motion } from "motion/react";
import type { MLA } from "../backend.d";

const SAMPLE_MLAS: MLA[] = [
  {
    id: BigInt(1),
    name: "Rajendra Singh Borola",
    constituency: "North Rajpur",
    bio: "A veteran politician with over 20 years of public service. Champion of rural development and farmers' rights. Has secured major irrigation projects and road infrastructure for the constituency.",
    photo: {
      getDirectURL: () => "",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: () => ({}) as any,
    } as any,
  },
  {
    id: BigInt(2),
    name: "Priya Sharma",
    constituency: "East Midnapore",
    bio: "Former educator and social activist turned MLA. Passionate about women's empowerment, education reform, and healthcare access for all citizens.",
    photo: {
      getDirectURL: () => "",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: () => ({}) as any,
    } as any,
  },
  {
    id: BigInt(3),
    name: "Mahendra Kumar Verma",
    constituency: "West Chandpur",
    bio: "Business leader and community organizer. Focused on industrial development, youth employment, and building modern infrastructure in semi-urban areas.",
    photo: {
      getDirectURL: () => "",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: () => ({}) as any,
    } as any,
  },
];

function MLACard({ mla, index }: { mla: MLA; index: number }) {
  const photoUrl = mla.photo?.getDirectURL?.();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-ocid={`mlas.item.${index + 1}`}
      className="bg-card rounded-lg overflow-hidden shadow-party card-hover border border-border"
    >
      <div className="relative h-56 bg-secondary overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={mla.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200">
            <User className="w-16 h-16 text-navy-400" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground text-xs font-display font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Award className="w-3 h-3" />
            MLA
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-1.5">
          {mla.name}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
          <span className="line-clamp-1">{mla.constituency}</span>
        </div>
        <div className="h-px bg-border mb-3" />
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {mla.bio}
        </p>
      </div>
    </motion.div>
  );
}

function MLASkeleton() {
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

export function MLAsPage() {
  const { data: mlas, isLoading, isError } = useGetAllMLAs();

  const displayData = mlas && mlas.length > 0 ? mlas : SAMPLE_MLAS;
  const isPlaceholder = !mlas || mlas.length === 0;

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="party-gradient py-14 md:py-20 relative overflow-hidden">
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
              <Award className="w-5 h-5 text-accent" />
              <span className="text-accent font-body text-sm font-semibold uppercase tracking-wider">
                Elected Representatives
              </span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-3">
              Our MLAs
            </h1>
            <p className="text-white/70 font-body text-lg max-w-xl">
              Meet the dedicated Members of Legislative Assembly who serve the
              people of BOROLA constituency.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {isLoading ? (
          <div
            data-ocid="mlas.loading_state"
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
              <MLASkeleton key={k} />
            ))}
          </div>
        ) : isError ? (
          <div data-ocid="mlas.error_state" className="text-center py-20">
            <p className="text-destructive font-body">
              Failed to load MLAs. Please try again.
            </p>
          </div>
        ) : (
          <>
            {isPlaceholder && (
              <div className="mb-6 px-4 py-3 bg-accent/10 border border-accent/20 rounded-md">
                <p className="text-sm text-accent-foreground/80 font-body">
                  Showing sample data — no MLAs have been added yet.
                </p>
              </div>
            )}
            <div
              data-ocid="mlas.list"
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {displayData.map((mla, i) => (
                <MLACard key={String(mla.id)} mla={mla} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
