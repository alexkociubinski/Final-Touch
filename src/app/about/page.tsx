export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tighter sm:text-7xl mb-12">
          The Last Detail.
        </h1>
        
        <div className="space-y-10 text-lg md:text-xl font-medium leading-relaxed text-white/70">
          <p>
            Final Touch was born on the field. We watched elite athletes spend hours 
            perfecting their form, their speed, and their strength—only to step onto the 
            stage with gear that felt generic.
          </p>
          
          <p>
            We believe that identity drives performance. When you see the flag on your 
            glove or the symbol on your bat, it’s not just a decoration. It’s a reminder 
            of who you are and why you play.
          </p>
          
          <div className="h-px w-24 bg-accent my-12" />
          
          <p>
            Our decals are engineered for the intensity of the game. Using high-tack 
            adhesives and weather-resistant finishes, we ensure that your signature stays 
            put from the first whistle to the final buzzer.
          </p>
          
          <p className="font-display uppercase tracking-tight text-3xl md:text-4xl text-white !mt-16">
            Details matter. Make yours count.
          </p>
        </div>
      </div>
    </div>
  );
}
