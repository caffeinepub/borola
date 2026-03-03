import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  ChevronRight,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

const stats = [
  { label: "Active MLAs", value: "24", icon: Award },
  { label: "Candidates", value: "48", icon: UserCheck },
  { label: "Supporters", value: "5,000+", icon: Users },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

export function HomePage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/uploads/borola-party2-1.jpg')",
          }}
        />
        <div className="hero-overlay absolute inset-0" />

        {/* Saffron top stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 saffron-gradient" />

        <div className="relative container mx-auto px-4 md:px-6 pb-16 pt-32">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div custom={0} variants={fadeUp}>
              <span className="inline-block bg-accent text-accent-foreground font-display font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                Official Party Platform
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-display font-black text-5xl md:text-7xl text-white leading-tight mb-4"
            >
              BOROLA
              <br />
              <span className="text-accent">Party</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="font-body text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
            >
              Building a stronger tomorrow — with integrity, dedication, and the
              power of the people. Together, we stand for progress and justice.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              className="flex flex-wrap gap-3"
            >
              <Link to="/join">
                <Button
                  data-ocid="home.join.primary_button"
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold shadow-saffron text-base px-8"
                >
                  Join BOROLA
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/mlas">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-display font-semibold text-base px-8"
                >
                  Meet Our MLAs
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-6 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.45 }}
                  className="text-center"
                >
                  <Icon className="w-5 h-5 text-accent mx-auto mb-1.5" />
                  <div className="font-display font-black text-2xl text-primary-foreground">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/60 text-xs font-body">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block w-12 h-1 bg-accent rounded-full mb-5" />
              <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4">
                Our Mission
              </h2>
              <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                BOROLA Party stands for the rights and dignity of every citizen.
                We believe in transparent governance, economic development, and
                social justice for all communities.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Transparent Governance",
                  desc: "Committed to open, accountable, and honest administration that serves the public interest.",
                  icon: "⚖️",
                },
                {
                  title: "Economic Growth",
                  desc: "Driving development, job creation, and prosperity for every constituency we represent.",
                  icon: "📈",
                },
                {
                  title: "Social Justice",
                  desc: "Ensuring equal rights, dignity, and opportunities for every member of our community.",
                  icon: "🤝",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.55 }}
                  className="bg-card border border-border rounded-lg p-6 shadow-xs card-hover text-center"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Nav Cards */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-black text-3xl text-foreground mb-2">
              Explore BOROLA
            </h2>
            <p className="text-muted-foreground font-body">
              Learn about our leaders, candidates, and how to join us
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              {
                title: "Our MLAs",
                desc: "Meet the elected representatives serving our constituents.",
                to: "/mlas",
                color: "bg-primary text-primary-foreground",
                ocid: "nav.mlas.link",
              },
              {
                title: "Candidates",
                desc: "Discover our upcoming election candidates.",
                to: "/candidates",
                color: "bg-accent text-accent-foreground",
                ocid: "nav.candidates.link",
              },
              {
                title: "Supporters",
                desc: "View the community of BOROLA supporters.",
                to: "/supporters",
                color: "bg-navy-700 text-white",
                ocid: "nav.supporters.link",
              },
              {
                title: "Join Us",
                desc: "Become a member and make a difference.",
                to: "/join",
                color: "bg-saffron-600 text-white",
                ocid: "nav.join.link",
              },
            ].map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
              >
                <Link
                  to={item.to}
                  data-ocid={item.ocid}
                  className={`block p-5 rounded-lg card-hover ${item.color} shadow-party`}
                >
                  <h3 className="font-display font-bold text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-80 font-body leading-snug mb-3">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-1 text-sm font-semibold opacity-90">
                    Explore <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 party-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-4">
              Be Part of the Change
            </h2>
            <p className="text-white/70 font-body text-lg mb-8 max-w-lg mx-auto">
              Join thousands of supporters who believe in BOROLA's vision for a
              better tomorrow.
            </p>
            <Link to="/join">
              <Button
                data-ocid="home.join.primary_button"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold shadow-saffron text-base px-10"
              >
                Join BOROLA Party Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
