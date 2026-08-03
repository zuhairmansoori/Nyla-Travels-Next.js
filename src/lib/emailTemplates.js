export function customerConfirmationTemplate(booking) {
  const directionLabel = booking.direction === 'departure' ? 'Departure' : 'Arrival';

  const serviceLabels = {
    meet_greet: { label: '🤝 Meet & Greet', bg: '#dcfce7', color: '#166534' },
    fast_track: { label: '⚡ Fast Track', bg: '#fee2e2', color: '#991b1b' },
    porter: { label: '🧳 Porter', bg: '#dbeafe', color: '#1e40af' },
    lounge_access: { label: '🛋️ Lounge Access', bg: '#ede9fe', color: '#5b21b6' },
    wheelchair: { label: '♿ Wheelchair', bg: '#fce7f3', color: '#9d174d' },
    unaccompanied_minor: { label: '🧒 Unaccompanied Minor', bg: '#fef3c7', color: '#92400e' },
    other: { label: '📌 Other', bg: '#f1f5f9', color: '#334155' },
  };

  const serviceTags = booking.assistanceTypes
    .map((type) => {
      const s = serviceLabels[type] || serviceLabels.other;
      return `<td style="background-color:${s.bg}; border-radius:8px; padding:6px 12px;"><span style="font-size:12px; color:${s.color}; font-weight:600;">${s.label}</span></td><td width="8"></td>`;
    })
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background-color:#f1f5f9; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); max-width:600px; width:100%;">

            <tr>
              <td style="background: linear-gradient(135deg, #0f766e 0%, #0891b2 100%); padding: 36px 32px; text-align:center;">
                <div style="font-size:22px; font-weight:800; color:#ffffff; letter-spacing:0.5px;">✈️ NYLA TRAVELS</div>
                <div style="font-size:13px; color:#ccfbf1; margin-top:6px; letter-spacing:1px; text-transform:uppercase;">Airport Assistance Confirmed</div>
              </td>
            </tr>

            <tr>
              <td style="padding: 28px 32px 0 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr><td style="background-color:#ecfdf5; border:1px solid #a7f3d0; border-radius:9999px; padding:6px 16px;">
                    <span style="color:#059669; font-size:13px; font-weight:600;">✓ Booking Received</span>
                  </td></tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding: 20px 32px 4px 32px;">
                <p style="margin:0; font-size:20px; font-weight:700; color:#0f172a;">Hi ${booking.fullName},</p>
                <p style="margin:8px 0 0 0; font-size:14px; color:#64748b; line-height:1.6;">
                  Aapki Airport Assistance booking successfully receive ho gayi hai. Neeche aapki booking ki poori details hain.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding: 24px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;">

                  <tr>
                    <td style="padding:20px 20px 16px 20px; border-bottom:1px dashed #cbd5e1;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">Flight</div>
                            <div style="font-size:18px; color:#0f172a; font-weight:800; margin-top:2px;">${booking.flightNumber.toUpperCase()}</div>
                          </td>
                          <td align="right">
                            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                              <td style="background-color:#e0f2fe; border-radius:9999px; padding:5px 14px;">
                                <span style="color:#0369a1; font-size:12px; font-weight:700;">${directionLabel}</span>
                              </td>
                            </tr></table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 4px 20px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:12px 0; border-bottom:1px solid #e2e8f0;" width="40%"><span style="font-size:13px; color:#94a3b8;">🛫 Airport</span></td>
                          <td style="padding:12px 0; border-bottom:1px solid #e2e8f0; text-align:right;"><span style="font-size:14px; color:#0f172a; font-weight:600; text-transform:capitalize;">${booking.airportName}</span></td>
                        </tr>
                        <tr>
                          <td style="padding:12px 0; border-bottom:1px solid #e2e8f0;"><span style="font-size:13px; color:#94a3b8;">📅 Travel Date</span></td>
                          <td style="padding:12px 0; border-bottom:1px solid #e2e8f0; text-align:right;"><span style="font-size:14px; color:#0f172a; font-weight:600;">${new Date(booking.travelDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></td>
                        </tr>
                        <tr>
                          <td style="padding:12px 0; border-bottom:1px solid #e2e8f0;"><span style="font-size:13px; color:#94a3b8;">👥 Passengers</span></td>
                          <td style="padding:12px 0; border-bottom:1px solid #e2e8f0; text-align:right;"><span style="font-size:14px; color:#0f172a; font-weight:600;">${booking.passengers}</span></td>
                        </tr>
                        <tr>
                          <td style="padding:12px 0; border-bottom:1px solid #e2e8f0;"><span style="font-size:13px; color:#94a3b8;">📞 Phone</span></td>
                          <td style="padding:12px 0; border-bottom:1px solid #e2e8f0; text-align:right;"><span style="font-size:14px; color:#0f172a; font-weight:600;">${booking.phone}</span></td>
                        </tr>
                        ${booking.specialRequests ? `
                        <tr>
                          <td style="padding:12px 0;" valign="top"><span style="font-size:13px; color:#94a3b8;">🧳 Special Requests</span></td>
                          <td style="padding:12px 0; text-align:right;"><span style="font-size:14px; color:#0f172a; font-weight:600;">${booking.specialRequests}</span></td>
                        </tr>` : ''}
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 4px 20px 20px 20px;">
                      <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px; font-weight:600; margin-bottom:10px;">Services Included</div>
                      <table role="presentation" cellpadding="0" cellspacing="0"><tr>${serviceTags}</tr></table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

            <tr>
              <td style="padding: 0 32px 28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fffbeb; border:1px solid #fde68a; border-radius:10px;">
                  <tr><td style="padding:14px 16px;">
                    <span style="font-size:13px; color:#92400e; line-height:1.6;">
                     <strong> ⏳ Our team will contact you shortly</strong> to confirm your booking. If you have any questions, simply reply to this email—we'll be happy to help.
                    </span>
                  </td></tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="background-color:#0f172a; padding: 24px 32px; text-align:center;">
                <div style="font-size:13px; color:#94a3b8; margin-bottom:4px;">Nyla Travels — Making journeys effortless</div>
                <div style="font-size:12px; color:#64748b;">support@nylatravels.com</div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}