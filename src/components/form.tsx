"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bounded } from "./bounded";

const ukPhoneRegex =
  /^(?:(?:\+44\s?|0)(?:\d{2}\s?\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4}|\d{4}\s?\d{6}|7\d{3}\s?\d{6}))$/;

const formSchema = z.object({
  firstname: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(100),
  lastname: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(100),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(
      ukPhoneRegex,
      "Please enter a valid UK phone number (e.g., 07xxx xxxxxx or +44 7xxx xxxxxx)",
    ),
  message: z
    .string()
    .min(2, "Message must be at least 2 characters")
    .max(300, "Message is too long 300 is the maximum number of characters"),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    form.reset({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
    });
  }

  const inputHeight = "h-12";

  return (
    <>
      <Bounded className="px-4 py-8">
        <div className="m-auto max-w-4xl">
          <div className="mb-8 py-8 text-center">
            <h2 className="text-4xl font-extrabold tracking-tighter capitalize sm:text-5xl sm:font-extrabold">
              We&apos;d love to hear from you
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              We would love to hear from you. Please fill out the form below.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl className={inputHeight}>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl className={inputHeight}>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl className={inputHeight}>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl className={inputHeight}>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message *</FormLabel>
                    <FormControl className="min-h-30">
                      <Textarea placeholder="Your message here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-8">
                <Button
                  type="submit"
                  className="bg-afm-blue hover:bg-afm-blue/90 w-full cursor-pointer py-4 text-white transition-all hover:scale-110 lg:w-auto"
                >
                  Send Message <HiOutlinePaperAirplane />
                </Button>
                <span className="text-muted-foreground block pb-4 text-sm lg:inline">
                  By submitting this form, I agree to be contacted by AFM DERBY
                  RUACH ASSEMBLY regarding church activities, prayer requests,
                  and community fellowship opportunities.
                </span>
              </div>
            </form>
          </Form>
        </div>
      </Bounded>
    </>
  );
};

export default ContactForm;
