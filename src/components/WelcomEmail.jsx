import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function WelcomeEmail({
  userFirstname = "Traveler",
  loginUrl = "https://nylatravels.com",
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Nyla Travels — let&apos;s plan your next trip</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#0f766e",
              },
            },
          },
        }}
      >
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-0 max-w-[560px] rounded-lg bg-white px-6 py-8">
            <Heading className="mb-6 text-center text-2xl font-bold text-brand">
              Nyla Travels
            </Heading>

            <Section className="px-2">
              <Text className="text-base font-semibold text-gray-900">
                Hi {userFirstname},
              </Text>

              <Text className="text-[15px] leading-6 text-gray-600">
                Welcome to the Nyla Travels family! Thanks for choosing us as
                your travel partner. You now have access to exclusive deals,
                curated packages, and personalized trip planning.
              </Text>

              <Text className="text-[15px] leading-6 text-gray-600">
                You&apos;re just one click away from starting your next
                journey:
              </Text>

              <Button
                href={loginUrl}
                className="my-6 block rounded-md bg-brand px-5 py-3 text-center text-[15px] font-semibold text-white"
              >
                Explore Your Trip
              </Button>

              <Text className="text-[15px] leading-6 text-gray-600">
                If you have any questions, our team is always here to help —
                just reply to this email.
              </Text>
            </Section>

            <Hr className="my-6 border-gray-200" />

            <Text className="text-center text-xs text-gray-400">
              Nyla Travels &middot;{" "}
              <Link href={loginUrl} className="text-brand underline">
                nylatravels.com
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}