// import type React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Construction,
//   Calendar,
//   Heart,
//   Users,
//   BookOpen,
//   Music,
// } from "lucide-react";

// interface UpcomingFeature {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   status: "coming-soon" | "in-progress" | "planned";
//   estimatedDate?: string;
// }

// interface UnderConstructionProps {
//   pageTitle?: string;
//   message?: string;
//   upcomingFeatures?: UpcomingFeature[];
//   showContactInfo?: boolean;
// }

// const defaultFeatures: UpcomingFeature[] = [
//   {
//     title: "Online Sermons",
//     description: "Watch and listen to our weekly messages",
//     icon: <BookOpen className="h-5 w-5" />,
//     status: "in-progress",
//     estimatedDate: "Coming Soon",
//   },
//   {
//     title: "Event Calendar",
//     description: "Stay updated with all church activities and events",
//     icon: <Calendar className="h-5 w-5" />,
//     status: "coming-soon",
//     estimatedDate: "Next Month",
//   },
//   {
//     title: "Prayer Requests",
//     description: "Submit and share prayer requests with our community",
//     icon: <Heart className="h-5 w-5" />,
//     status: "planned",
//     estimatedDate: "Coming Soon",
//   },
//   {
//     title: "Small Groups",
//     description: "Find and join small groups in your area",
//     icon: <Users className="h-5 w-5" />,
//     status: "planned",
//     estimatedDate: "Coming Soon",
//   },
//   {
//     title: "Worship Music",
//     description: "Listen to our worship songs and hymns",
//     icon: <Music className="h-5 w-5" />,
//     status: "coming-soon",
//     estimatedDate: "Coming Soon",
//   },
// ];

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "in-progress":
//       return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
//     case "coming-soon":
//       return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
//     case "planned":
//       return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
//     default:
//       return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
//   }
// };

// const getStatusText = (status: string) => {
//   switch (status) {
//     case "in-progress":
//       return "In Progress";
//     case "coming-soon":
//       return "Coming Soon";
//     case "planned":
//       return "Planned";
//     default:
//       return "Planned";
//   }
// };

// export default function UnderConstruction({
//   pageTitle = "Page Under Construction",
//   message = "We're working hard to bring you something amazing! This page is currently being built with love and care.",
//   upcomingFeatures = defaultFeatures,
//   showContactInfo = true,
// }: UnderConstructionProps) {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
//       <div className="w-full max-w-4xl space-y-8">
//         {/* Main Construction Notice */}
//         <Card className="text-center">
//           <CardHeader className="pb-4">
//             <div className="mb-4 flex justify-center">
//               <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
//                 <Construction className="h-8 w-8 text-orange-600 dark:text-orange-400" />
//               </div>
//             </div>
//             <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">
//               {pageTitle}
//             </CardTitle>
//             <CardDescription className="mx-auto mt-2 max-w-2xl text-lg">
//               {message}
//             </CardDescription>
//           </CardHeader>
//         </Card>

//         {/* Upcoming Features */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center text-2xl">
//               What&apos;s Coming Up
//             </CardTitle>
//             <CardDescription className="text-center">
//               Here&apos;s what we&apos;re working on to serve our community
//               better
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//               {upcomingFeatures.map((feature, index) => (
//                 <div
//                   key={index}
//                   className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-md dark:bg-gray-800"
//                 >
//                   <div className="flex items-start space-x-3">
//                     <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
//                       {feature.icon}
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <div className="mb-2 flex items-center justify-between">
//                         <h3 className="truncate font-semibold text-gray-900 dark:text-gray-100">
//                           {feature.title}
//                         </h3>
//                         <Badge className={getStatusColor(feature.status)}>
//                           {getStatusText(feature.status)}
//                         </Badge>
//                       </div>
//                       <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
//                         {feature.description}
//                       </p>
//                       {feature.estimatedDate && (
//                         <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
//                           {feature.estimatedDate}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Contact Information */}
//         {showContactInfo && (
//           <Card className="text-center">
//             <CardContent className="pt-6">
//               <h3 className="mb-4 text-lg font-semibold">Stay Connected</h3>
//               <p className="mb-4 text-gray-600 dark:text-gray-400">
//                 In the meantime, feel free to reach out to us or visit our
//                 current pages.
//               </p>
//               <div className="flex flex-col justify-center gap-3 sm:flex-row">
//                 <Button variant="default">Contact Us</Button>
//                 <Button variant="outline">Visit Homepage</Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Footer Message */}
//         <div className="text-center text-sm text-gray-500 dark:text-gray-400">
//           <p>
//             Thank you for your patience as we build something wonderful
//             together.
//           </p>
//           <p className="mt-1">
//             <span className="font-medium">Blessings,</span> The Church Website
//             Team
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

const UnderConstruction = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-[#112B45]/95 to-[#0C1E31] text-white">
      <div>
        <h1 className="text-5xl font-bold">Sorry...</h1>
        <p className="mt-2">This page is currently under construction.</p>
      </div>
    </div>
  );
};

export default UnderConstruction;
