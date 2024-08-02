import { Anchor, Image, Text } from '@mantine/core';

import PayPalImage from './assets/SGA_Paypal.webp';

export function SupportUs() {
  return (
    <>
      <Text size="lg" fw={600}>Make an Impact with Your Support</Text>
      <Text size="md" fw={300}>
        At Share and Grow Association (S&GA), recognized as a 501(c)(3) non-profit entity, our heart beats for community service. 
        Our passionate volunteers, both adults and students, dedicate thousands of hours each year without any financial compensation. 
        Together, we create and provide a plethora of free events and services that enrich our community. 
        Our lifeline is the financial support we receive from compassionate individuals, local businesses, and community grants. We stand today because of your generosity, and your continued support is the cornerstone that allows us to enhance and diversify our community services.
      </Text>

      <Text size="lg" fw={600} mt="lg">Ways to Contribute:</Text>
      <Text size="md" fw={300}><b>Online Donations:</b> Click or scan the PayPal QR code below for a swift and secure transaction.</Text>
      <Text size="md" fw={300}><b>Donations by Check:</b> Checks should be made payable to "Share and Grow Association". To mail your check, please email sharegrow.org@gmail.com for the mailing address.</Text>

      <Anchor href="https://www.paypal.com/donate?hosted_button_id=YDPXJ2AGEWDQY" target="_blank">
        <Image h={200} w="auto" fit="contain" src={PayPalImage} mt={10} mb={10} />
      </Anchor>

      <Text size="md" fw={300}>Please note, all contributions are tax-deductible, and the S&GA will provide a donation certificate for your records.</Text>
      <Text size="md" fw={300}>Your Support Transforms Lives—Every Penny Counts! Thank You for Believing in Our Mission!</Text>
      <Text size="md" fw={300}>If you do not have a PayPal account, you can still donate through PayPal with a credit/debit card. Just choose "Donate with a Debit or Credit Card" on the PayPal page.</Text>

    </>
  );
}