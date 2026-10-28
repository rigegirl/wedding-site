import { useState } from 'react';
import { weddingData } from '../data/weddingData';
import { Key, Send, CircleCheck } from 'lucide-react';

const GROUP_CODES = {
  DLF726: "Daddy's legal friends/colleagues",
  HUTMOL26: 'HUMOL Magodo',
  LP21L26: 'LP 21 Leaders Group',
  DADFAM26: "Daddy's family",
  DADFRE26: "Daddy's friends",
  MUMFAM26: "Mummy's family",
  MUCOL726: "Mummy's colleagues",
  MUMFRE26: "Mummy's Friends",
  COMMEM26: 'Chapel of Mercy members',
  COMWOR26: 'Chapel of Mercy members',
  COMMIN26: 'COM (Ministers)',
  DADPAS: "INVITED PASTORS",
  CHURCH: "CHURCH FRIENDS",
  '74921': 'General Invitation',
};

const RSVP_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbyTLYyckr_HIbC4YjVA1P-kRACGl_nA9hg1mmHjbjJzlmJz2XfN26c4o1GzmCYCHsyJ/exec';

const initialForm = {
  inviteCode: '',
  firstName: '',
  lastName: '',
  email: '',
  attendance: null,
  attendingWith: 'self',
  spouseFirstName: '',
  spouseLastName: '',
  spouseAttendance: null,
  message: '',
};

export default function RSVP() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inviteVerified, setInviteVerified] = useState(false);
  const [guestGroup, setGuestGroup] = useState('');

  const verifyInviteCode = () => {
    const code = form.inviteCode.trim().toUpperCase();
    const group = GROUP_CODES[code];

    if (!group) {
      setErrors((previous) => ({
        ...previous,
        inviteCode:
          'This invitation code is not recognised. Please check your invitation.',
      }));
      setInviteVerified(false);
      setGuestGroup('');
      return;
    }

    setErrors((previous) => ({
      ...previous,
      inviteCode: undefined,
    }));

    setForm((previous) => ({
      ...previous,
      inviteCode: code,
    }));

    setGuestGroup(group);
    setInviteVerified(true);
  };

  const update = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: undefined,
      }));
    }

    if (field === 'inviteCode') {
      setInviteVerified(false);
      setGuestGroup('');
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!inviteVerified) {
      nextErrors.inviteCode = 'Please verify your invitation code first.';
    }

    if (!form.firstName.trim()) {
      nextErrors.firstName = 'First name is required.';
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName = 'Last name is required.';
    }

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (form.attendance === null) {
      nextErrors.attendance = 'Please select your attendance.';
    }

    if (form.attendingWith === 'spouse') {
      if (!form.spouseFirstName.trim()) {
        nextErrors.spouseFirstName = "Your spouse's first name is required.";
      }

      if (!form.spouseLastName.trim()) {
        nextErrors.spouseLastName = "Your spouse's last name is required.";
      }

      if (form.spouseAttendance === null) {
        nextErrors.spouseAttendance =
          "Please select your spouse's attendance.";
      }
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        inviteCode: form.inviteCode,
        group: guestGroup,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        attendance: form.attendance,
        attendingWith: form.attendingWith,
        spouseFirstName:
          form.attendingWith === 'spouse'
            ? form.spouseFirstName.trim()
            : '',
        spouseLastName:
          form.attendingWith === 'spouse'
            ? form.spouseLastName.trim()
            : '',
        spouseAttendance:
          form.attendingWith === 'spouse'
            ? form.spouseAttendance
            : null,
        message: form.message.trim(),
      };

      const response = await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || 'We could not submit your RSVP. Please try again.'
        );
      }

      setSubmitted(true);
    } catch (error) {
      console.error('RSVP submission error:', error);

      setErrors((previous) => ({
        ...previous,
        submit:
          error.message ||
          'We could not submit your RSVP. Please try again.',
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const deadlineDate = new Date(
    '2026-10-27T12:00:00'
  ).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const inputClasses = (field) =>
    `w-full px-5 py-3.5 bg-white border ${
      errors[field] ? 'border-red-400' : 'border-brand-border'
    } rounded-xl text-sm text-brand-espresso placeholder:text-brand-gray/50 focus:outline-none focus:border-brand-gold transition-colors`;

  const attendanceOptions = [
    { value: true, label: "Yes, I'll be there" },
    { value: false, label: "No, I can't make it" },
  ];

  if (submitted) {
    return (
      <section
        id="rsvp"
        className="px-6 py-24 lg:py-36"
        style={{ scrollMarginTop: '100px' }}
      >
        <div className="max-w-[600px] mx-auto text-center">
          <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-12 shadow-[0_15px_40px_rgba(20,17,12,0.06)]">
            <div className="w-16 h-16 rounded-full bg-brand-pink flex items-center justify-center mx-auto mb-6">
              <CircleCheck size={32} className="text-brand-green" />
            </div>

            <h3 className="font-serif text-3xl text-brand-espresso mb-3">
              Thank You!
            </h3>

            <p className="text-brand-gray text-sm leading-relaxed">
              Your RSVP has been received. We can&apos;t wait to celebrate
              with you!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="px-6 py-24 pb-28 lg:py-36"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="max-w-[650px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-brand-wine uppercase mb-4">
            JOIN OUR CELEBRATION
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-espresso mb-4">
            RSVP
          </h2>

          <p className="font-serif italic text-brand-gray text-lg mb-6">
            Confirm Your Attendance
          </p>

          <div className="w-16 h-px bg-brand-border mx-auto mb-6" />

          <p className="text-sm text-brand-gray">
            Kindly RSVP before{' '}
            <strong className="text-brand-espresso">{deadlineDate}</strong>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 lg:p-12 shadow-[0_15px_40px_rgba(20,17,12,0.06)]"
        >
          {/* Invitation code */}
          <div className="mb-8 p-5 bg-brand-pink/60 rounded-2xl border border-brand-border">
            <label className="block text-[10px] font-semibold tracking-[0.2em] text-brand-espresso mb-2">
              INVITATION CODE *
            </label>

            <div className="relative">
              <Key
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray/50"
              />

              <input
                type="text"
                maxLength={12}
                placeholder="Enter your invitation code"
                value={form.inviteCode}
                disabled={inviteVerified}
                onChange={(event) =>
                  update('inviteCode', event.target.value.toUpperCase())
                }
                className={`${inputClasses('inviteCode')} pl-11`}
                autoComplete="off"
              />
            </div>

            {errors.inviteCode && (
              <p className="text-red-500 text-xs mt-2">
                {errors.inviteCode}
              </p>
            )}

            {!inviteVerified ? (
              <button
                type="button"
                onClick={verifyInviteCode}
                disabled={!form.inviteCode.trim()}
                className="w-full mt-4 py-3 bg-brand-gold-light text-brand-black rounded-full text-[11px] font-semibold tracking-[0.15em] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                VERIFY CODE
              </button>
            ) : (
              <div className="flex items-start gap-2 text-brand-green text-xs font-medium mt-3">
                <CircleCheck size={16} className="shrink-0" />
                <span>
                  Invitation verified. Group:{' '}
                  <strong>{guestGroup}</strong>
                </span>
              </div>
            )}
          </div>

          {inviteVerified && (
            <>
              {/* Guest details */}
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-[10px] font-semibold tracking-[0.2em] text-brand-espresso mb-2">
                    FIRST NAME *
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(event) =>
                      update('firstName', event.target.value)
                    }
                    className={inputClasses('firstName')}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-semibold tracking-[0.2em] text-brand-espresso mb-2">
                    LAST NAME *
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(event) =>
                      update('lastName', event.target.value)
                    }
                    className={inputClasses('lastName')}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-[10px] font-semibold tracking-[0.2em] text-brand-espresso mb-2">
                  EMAIL *
                </label>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  className={inputClasses('email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Guest attendance */}
              <div className="mb-6">
                <label className="block text-[10px] font-semibold tracking-[0.2em] text-brand-espresso mb-3">
                  WILL YOU ATTEND? *
                </label>

                <div className="grid sm:grid-cols-2 gap-3">
                  {attendanceOptions.map((option) => (
                    <button
                      key={String(option.value)}
                      type="button"
                      onClick={() => update('attendance', option.value)}
                      className={`flex items-center justify-between gap-3 px-5 py-4 rounded-xl border-2 transition-all ${
                        form.attendance === option.value
                          ? 'border-brand-gold bg-brand-gold/5'
                          : 'border-brand-border bg-white hover:border-brand-gray/30'
                      }`}
                    >
                      <span className="text-sm text-brand-espresso text-left">
                        {option.label}
                      </span>
                      {form.attendance === option.value && (
                        <CircleCheck
                          size={18}
                          className="text-brand-gold shrink-0"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {errors.attendance && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.attendance}
                  </p>
                )}
              </div>


              {/* Message */}
              <div className="mb-8">
                <label className="block text-[10px] font-semibold tracking-[0.2em] text-brand-espresso mb-2">
                  MESSAGE FOR THE COUPLE{' '}
                  <span className="text-brand-gray font-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  rows={4}
                  placeholder={`Share a sweet note, prayers, or well wishes for ${weddingData.couple.partner2} & ${weddingData.couple.partner1}...`}
                  value={form.message}
                  onChange={(event) => update('message', event.target.value)}
                  className={`${inputClasses('message')} resize-none`}
                />
              </div>

              {/* Event notice */}
              <div className="text-center mb-8">
                <div className="w-12 h-px bg-brand-border mx-auto mb-4" />
                <p className="text-xs text-brand-gray">
                  Please note that this is strictly an{' '}
                  <strong className="text-brand-espresso">adult-only</strong>{' '}
                  event. No children.
                </p>
                <div className="w-12 h-px bg-brand-border mx-auto mt-4" />
              </div>

              {errors.submit && (
                <p className="text-red-500 text-xs text-center mb-4">
                  {errors.submit}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-brand-gold-light text-brand-black rounded-full text-[12px] font-semibold tracking-[0.15em] hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_24px_rgba(180,158,119,0.3)] disabled:opacity-60"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    SUBMIT RSVP
                  </>
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}