import { motion } from "motion/react";
import ScrollVelocity from "./ScrollVelocity";

export function ScrollVelocitySection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-card border-y border-border/50 overflow-hidden">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-12"
        >
          {/* Stream 1 - Skills & Achievements (3 rows) */}
          <div className="space-y-3">
            <ScrollVelocity
              texts={[
                "branding • consulting & client advisory • gtm strategy • 520% roi • nps +15% lifts • funnel design",
              ]}
              velocity={80}
              className="text-accent font-mono tracking-tight"
              damping={35}
              stiffness={400}
              numCopies={6}
            />
            <ScrollVelocity
              texts={[
                "brand storytelling • cross-functional team leadership • social media strategy • brand voice • project management",
              ]}
              velocity={60}
              className="text-accent/80 font-mono tracking-tight"
              damping={40}
              stiffness={380}
              numCopies={5}
            />
            <ScrollVelocity
              texts={[
                "customer journey mapping • marketing automation • content strategy • performance marketing • conversion optimization",
              ]}
              velocity={70}
              className="text-accent/60 font-mono tracking-tight"
              damping={38}
              stiffness={390}
              numCopies={5}
            />
          </div>

          {/* Stream 2 - Technical Tools (3 rows) */}
          <div className="space-y-3">
            <ScrollVelocity
              texts={[
                "excel • ga4 • tableau • spss • python • n8n/make automation • gpt api",
              ]}
              velocity={65}
              className="text-accent-secondary/70 font-mono tracking-tight"
              damping={40}
              stiffness={350}
              numCopies={5}
            />
            <ScrollVelocity
              texts={[
                "crm • seo/sem • cms (shopify/wordpress) • data visualization • analytics",
              ]}
              velocity={55}
              className="text-accent-secondary/55 font-mono tracking-tight"
              damping={42}
              stiffness={340}
              numCopies={5}
            />
            <ScrollVelocity
              texts={[
                "sql • figma • adobe creative suite • zapier • mailchimp • hootsuite • asana",
              ]}
              velocity={60}
              className="text-accent-secondary/40 font-mono tracking-tight"
              damping={38}
              stiffness={360}
              numCopies={6}
            />
          </div>

          {/* Stream 3 - Philosophy & Approach (3 rows) */}
          <div className="space-y-3">
            <ScrollVelocity
              texts={[
                "bringing a marketing lens to tech heavy challenges • strategy is the product, storytelling is the delivery",
              ]}
              velocity={45}
              className="text-muted-foreground/50 font-mono tracking-tight"
              damping={25}
              stiffness={300}
              numCopies={4}
            />
            <ScrollVelocity
              texts={[
                "bridging creativity with data driven insights • transforming chaos into strategic success",
              ]}
              velocity={40}
              className="text-muted-foreground/40 font-mono tracking-tight"
              damping={28}
              stiffness={290}
              numCopies={4}
            />
            <ScrollVelocity
              texts={[
                "human-centered design meets analytical rigor • building brands that resonate and convert",
              ]}
              velocity={50}
              className="text-muted-foreground/30 font-mono tracking-tight"
              damping={30}
              stiffness={310}
              numCopies={5}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}