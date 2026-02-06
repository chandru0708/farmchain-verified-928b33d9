import { Link } from "react-router-dom";
import { Leaf, Globe, Heart, Sprout } from "lucide-react";

const sdgGoals = [
  { id: 2, name: "Zero Hunger", color: "#DDA63A" },
  { id: 12, name: "Responsible Consumption", color: "#BF8B2E" },
  { id: 13, name: "Climate Action", color: "#3F7E44" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                AgroLedger
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              Transparent agriculture powered by blockchain technology. 
              Track your food from farm to fork with complete trust and accountability.
            </p>
            
            {/* SDG Goals */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Supporting UN Sustainable Development Goals
              </p>
              <div className="flex flex-wrap gap-2">
                {sdgGoals.map((goal) => (
                  <span
                    key={goal.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full text-white"
                    style={{ backgroundColor: goal.color }}
                  >
                    <Globe className="h-3 w-3" />
                    SDG {goal.id}: {goal.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/farmer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Farmer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/consumer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Track Batch
                </Link>
              </li>
              <li>
                <Link to="/traceability" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Traceability
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Verification Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Sustainability */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Our Mission</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Sprout className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                Sustainable farming practices
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                Fair prices for farmers
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                Reduced food waste
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AgroLedger. Building trust in agriculture.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Powered by Blockchain Technology</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-expired fill-expired" /> for farmers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}