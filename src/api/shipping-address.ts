import { instance } from "utils/http-client";

interface UpdateShippingAddressPayload {
  name: string;
  recipientName: string;
  postalCode: number;
  address1: string;
  address2: string;
  note: string;
  phone1: string;
  phone2: string;
}

export function updateShippingAddressApi({
  name,
  recipientName,
  postalCode,
  address1,
  address2,
  note,
  phone1,
  phone2,
}: UpdateShippingAddressPayload) {
  return instance.put("/v1/me/shipping-address", {
    name: name,
    recipient_name: recipientName,
    postal_code: postalCode,
    address1: address1,
    address2: address2,
    note: note,
    phone1: phone1,
    phone2: phone2,
  });
}
