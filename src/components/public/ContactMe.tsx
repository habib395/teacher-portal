import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactMe() {
  return (
    <section id="contact" className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center">Contact Me</h2>
        <p className="mt-2 text-center text-gray-600">
          Have a question? Send me a message.
        </p>

        <form className="mt-8 space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Your name" />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              rows={4}
              placeholder="Your message"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm"
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}