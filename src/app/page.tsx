
import { TrackingSearch } from '@/components/tracking-search';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Globe, Zap, Ship, Plane, Truck, Calculator, PackagePlus, HelpCircle, Mail, Phone, Clock, MapPin, QrCode, Weight, Timer, ShieldCheck, CheckCircle, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-primary">NEXT GLOBAL EXPRESS</span>
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative bg-gray-50/50 pt-12 sm:pt-16 lg:pt-20 bg-hero-animated">
            <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center px-4 md:px-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        Global Reach, Personal Touch. <br />
                        A Promise <span className="text-primary">Delivered.</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        From local parcels to global freight, we handle every shipment with unparalleled precision and care. Trust us to connect your world, seamlessly and securely.
                    </p>
                    <div className="mt-10">
                        <p className="font-semibold text-gray-800">Track your shipment</p>
                        <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
                             <div className="flex items-center gap-2 border rounded-md p-2 bg-white flex-grow w-full">
                                <Search className="h-6 w-6 text-muted-foreground ml-2"/>
                                <TrackingSearch />
                             </div>
                        </div>
                        
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-gray-600">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span>No Minimum Weight</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span>2-3 Days Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span>Real-Time Updates</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span>100% Insured</span>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block relative w-full h-[500px]">
                     <Image
                        src="https://picsum.photos/seed/delivery-person/600/700"
                        alt="Delivery person with a package"
                        fill
                        className="object-contain"
                        data-ai-hint="person package"
                      />
                </div>
            </div>
        </section>

        <section className="py-16 w-full bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">Our Services</h2>
                <p className="text-muted-foreground mt-2">Comprehensive logistics solutions for your business.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <Link href="/services/air-freight" className="group flex">
                <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 w-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300 mb-4">
                    <Plane className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold">Air Freight</h3>
                  <p className="text-muted-foreground mt-2">
                    Fast and reliable air cargo services for time-sensitive shipments.
                  </p>
                </div>
              </Link>
              <Link href="/services/ocean-freight" className="group flex">
                <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 w-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300 mb-4">
                    <Ship className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold">Ocean Freight</h3>
                  <p className="text-muted-foreground mt-2">
                    Cost-effective sea freight for large and bulk shipments.
                  </p>
                </div>
              </Link>
              <Link href="/services/land-transport" className="group flex">
                <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 w-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300 mb-4">
                    <Truck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold">Land Transport</h3>
                  <p className="text-muted-foreground mt-2">
                    Domestic and cross-border trucking for seamless door-to-door delivery.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 w-full bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary">Our Hubs Around The World</h2>
              <p className="text-muted-foreground mt-2">Explore our global hubs for seamless shipping to and from the UAE.</p>
            </div>
            <Tabs defaultValue="dubai" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 mb-8">
                <TabsTrigger value="dubai" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-white">Dubai, UAE</TabsTrigger>
                <TabsTrigger value="manila" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-white">Manila, Philippines</TabsTrigger>
              </TabsList>
              <TabsContent value="dubai">
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold">DUBAI HUB</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-primary mt-1"/>
                            <div>
                              <p className="font-semibold">Address</p>
                              <p className="text-muted-foreground">Warehouse 42, Al Quoz Industrial Area 3, Dubai, UAE</p>
                            </div>
                          </div>
                           <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-primary mt-1"/>
                            <div>
                              <p className="font-semibold">Email</p>
                              <p className="text-muted-foreground">customercare@nge.ae</p>
                            </div>
                          </div>
                           <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-primary mt-1"/>
                            <div>
                              <p className="font-semibold">Mobile</p>
                              <p className="text-muted-foreground">+971 50 123 4567</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Card className="bg-primary/10 border-primary/20">
                            <CardContent className="p-4 text-center">
                              <p className="font-semibold text-primary">Operating Time</p>
                              <p className="text-sm">EVERYDAY</p>
                              <p className="text-sm">9 AM - 6 PM</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-primary/10 border-primary/20">
                             <CardContent className="p-4 text-center">
                              <p className="font-semibold text-primary">Time Zone</p>
                              <p className="text-sm">UAE Time Zone</p>
                              <p className="text-sm">GMT+4</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      <div>
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.026933303158!2d55.385!3d25.269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c5b5f5f5f5f%3A0x3f3f3f3f3f3f3f3f!2sDubai!5e0!3m2!1sen!2sae!4v1622712345678" 
                          width="100%" 
                          height="350" 
                          style={{border:0}} 
                          allowFullScreen={true} 
                          loading="lazy"
                          className="rounded-md"
                        ></iframe>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="manila">
                 <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold">MANILA HUB</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-primary mt-1"/>
                            <div>
                              <p className="font-semibold">Address</p>
                              <p className="text-muted-foreground">Unit 14, Cargo Complex, 123 Airline Avenue, Pasay City, Metro Manila, Philippines</p>
                            </div>
                          </div>
                           <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-primary mt-1"/>
                            <div>
                              <p className="font-semibold">Email</p>
                              <p className="text-muted-foreground">customercare.ph@nge.com</p>
                            </div>
                          </div>
                           <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-primary mt-1"/>
                            <div>
                              <p className="font-semibold">Mobile</p>
                              <p className="text-muted-foreground">+63 917 123 4567</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Card className="bg-primary/10 border-primary/20">
                            <CardContent className="p-4 text-center">
                              <p className="font-semibold text-primary">Operating Time</p>
                              <p className="text-sm">WEEKDAYS</p>
                              <p className="text-sm">8 AM - 5 PM</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-primary/10 border-primary/20">
                             <CardContent className="p-4 text-center">
                              <p className="font-semibold text-primary">Time Zone</p>
                              <p className="text-sm">PH Time Zone</p>
                              <p className="text-sm">GMT+8</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      <div>
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123560.6815344331!2d120.94523319985207!3d14.57321949195992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9a63a56213d%3A0x446d35434d742618!2sManila%2C%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2sae!4v1717590855781!5m2!1sen!2sae"
                          width="100%" 
                          height="350" 
                          style={{border:0}} 
                          allowFullScreen={true} 
                          loading="lazy"
                          className="rounded-md"
                        ></iframe>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16 w-full bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Link href="/09087801">
                <div className="group flex flex-col justify-center text-center p-6 rounded-lg bg-gray-100 h-full hover:bg-primary/90 transition-colors duration-300">
                  <Truck className="w-10 h-10 mx-auto mb-4 text-primary group-hover:text-primary-foreground" />
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-foreground">Admin Login</h3>
                  <p className="text-gray-600 group-hover:text-primary-foreground group-hover:opacity-80">Access the admin dashboard.</p>
                </div>
              </Link>
              <Link href="#">
                <div className="group flex flex-col justify-center text-center p-6 rounded-lg bg-gray-100 h-full hover:bg-primary/90 transition-colors duration-300">
                  <Calculator className="w-10 h-10 mx-auto mb-4 text-primary group-hover:text-primary-foreground" />
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-foreground">Rate Calculator</h3>
                  <p className="text-gray-600 group-hover:text-primary-foreground group-hover:opacity-80">How much to ship your package? Click here.</p>
                </div>
              </Link>
              <Link href="#">
                <div className="group flex flex-col justify-center text-center p-6 rounded-lg bg-gray-100 h-full hover:bg-primary/90 transition-colors duration-300">
                  <PackagePlus className="w-10 h-10 mx-auto mb-4 text-primary group-hover:text-primary-foreground" />
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-foreground">Business Shipment</h3>
                  <p className="text-gray-600 group-hover:text-primary-foreground group-hover:opacity-80">Enjoy the best rates — made just for you.</p>
                </div>
              </Link>
              <Link href="#">
                <div className="group flex flex-col justify-center text-center p-6 rounded-lg bg-gray-100 h-full hover:bg-primary/90 transition-colors duration-300">
                  <HelpCircle className="w-10 h-10 mx-auto mb-4 text-primary group-hover:text-primary-foreground" />
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-foreground">Frequently Asked Questions</h3>
                  <p className="text-gray-600 group-hover:text-primary-foreground group-hover:opacity-80">Need help? Tap me.</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

      </main>

       <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Next Global Express. All rights reserved.</p>
            </div>
       </footer>
    </div>
  );
}

    