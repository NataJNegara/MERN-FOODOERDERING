import { getClient } from "../config/mailgunConfig.js";

export const sendEmailReceipt = function (order) {
  const mailClient = getClient();

  console.log("okay okay");

  mailClient.messages
    .create("sandboxf50150a27db04b0ba77046ec84c0dfc6.mailgun.org", {
      from: "mern-food@example.com",
      to: order.email,
      subject: `Order ${order._id} is on process`,
      html: getReceiptHtml(order),
    })
    .then((msg) => console.log(msg)) //onSuccess
    .catch((error) => console.log(error)); //onError
};

const getReceiptHtml = function (order) {
  return `
    <html>
        <head>
            <style>
            table {
                border-collapse: collapse;
                width: 100%
                max-width: 35rem;
            }
            th, td {
                text-align: left;
                padding: 8px
            }
            th{
                border-bottom: 1px solid #ced4da
            }
            </style>
        </head>

        <body>
            <h1>Order payment confimation</h1>
            <p>Dear ${order.name},</p>
            <p>Thank you for ordering! Your order has been successfully paid and on process</p>
            <p><strong>Tracking ID: </strong>${order._id}</p>
            <p><strong>Order Date: </strong>${order.createdAt
              .toISOString()
              .replace("T", " ")
              .substr(0, 16)}</p>
            <h2>Order details</h2>

            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                ${order.items
                  .map(
                    (item) => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.quantity}</td>
                        <td>${item.totalPrice}</td>
                    </tr>
                `
                  )
                  .join("\n")}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3"><strong>Total:</strong></td>
                        <td>Rp. ${order.totalPrice}</td>
                    </tr>
                </tfoot>
            </table>
            <p><strong>Shipping Address:</strong> ${order.address}</p>
        </body>
    </html>
    `;
};
