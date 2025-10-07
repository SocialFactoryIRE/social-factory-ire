import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/social-factory-logo.jpeg";
const Footer = () => {
  return <footer className="bg-muted border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={logo} alt="Social Factory Logo" className="w-full h-full object-cover" />
            </div>
              <span className="font-bold text-lg text-foreground">Social Factory CLG - 796481</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ireland's first social factory tackling loneliness through community connection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programming" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Programming
                </Link>
              </li>
              <li>
                <Link to="/science" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Science & Research
                </Link>
              </li>
              <li>
                <Link to="/governance" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Governance
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/join" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Join Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Ireland</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Jason@socialfactory.ie</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+353 85 820 8979</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Social Factory. All rights reserved. Aligned with New European Bauhaus values.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;