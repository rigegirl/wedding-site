import { useState } from 'react';
import { weddingData } from '../data/weddingData';
import { Key, Send, CircleCheck } from 'lucide-react';

const WEDDING_INVITE_CODE = '74921';

export default function RSVP() {
  const [form, setForm] = useState({
    inviteCode: '',
    firstName: '',
    lastName: '',
    email: '',
    attendance: null,
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inviteVerified, setInviteVerified] = useState(false);

  const verifyInviteCode = () => {
    if (form.inviteCode !== WEDDING_INVITE_CODE) {
      setErrors((e) => ({
        ...e,
        inviteCode:
          'Incorrect invite code. Please check your invitation and try again.',
      }));
      setInviteVerified(false);
      return;
    }

    setErrors((e) => ({
      ...e,
      inviteCode: undefined,
    }));

    setInviteVerified(true);
  };

  const validate = () => {
    const errs = {};

    if (!inviteVerified) {
      errs.inviteCode = 'Please verify your invite code first';
    }

    if (!form.firstName.trim()) {
      errs.firstName = 'First name is required';
    }

    if (!form.lastName.trim()) {
      errs.lastName = 'Last name is required';
    }

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      errs.email = 'Please enter a valid email';
    }

    if (form.attendance === null) {
      errs.attendance = 'Please select your attendance';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    try {
     
const response = await fetch(
  'https://script.google.com/macros/s/AKfycbyTLYyckr_HIbC4YjVA1P-kRACGl_nA9hg1mmHjbjJzlmJz2XfN26c4o1GzmCYCHsyJ/exec',
  {
    method: 'POST',
    body: JSON.stringify({
      inviteCode: form.inviteCode,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      attendance: form.attendance,
      message: form.message,
    }),
  }
);

const result = await response.json();

if (!result.success) {
  throw new Error(
    result.message || 'We could not submit your RSVP. Please try again.'
  );
}

      setSubmitted(true);
    } catch (error) {
      console.error('RSVP submission error:', error);

      setErrors({
        submit:
          error.message ||
          'We could not submit your RSVP. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));

    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }

    if (field === 'inviteCode') {
      setInviteVerified(false);
    }
  };

  const deadlineDate = new Date(
    weddingData.rsvpDeadline
  ).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (submitted) {
    return (
      <section
        id="rsvp"
        className="py-24 lg:py-36 px-6"
        style={{ scrollMarginTop: '100px' }}
      >
        <div className="max-w-[600px] mx-auto text-center">
          <div className="bg-white rounded-3xl border border-brand-border p-12 shadow-[0_15px_40px_rgba(20,17,12,0.06)]">
            <div className="w-16 h-16 rounded-full bg-brand-pink flex items-center justify-center mx-auto mb-6">
              <CircleCheck
                size={32}
                className="text-brand-green"
              />
            </div>

            <h3 className="font-serif text-3xl text-brand-espresso mb-3">
              Thank You!
            </h3>

            <p className="text-brand-gray text-sm leading-relaxed">
              Your RSVP has been received. We can&rsquo;t wait to celebrate
              with you!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const inputClasses = (field) =>
    `w-full px-5 py-3.5 bg-white border ${
      errors[field]
        ? 'border-red-400'
        : 'border-brand-border'
    } rounded-xl text-sm text-brand-espresso placeholder:text-brand-gray/50 focus:outline-none focus:border-brand-gold transition-colors`;

  return (
    <section
      id="rsvp"
      className="py-24 lg:py-36 px-6"
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
            Kindly RSVP by{' '}
            <strong className="text-brand-espresso">
              {deadlineDate}
            </strong>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-brand-border p-8 lg:p-12 shadow-[0_15px_40px_rgba(20,17,12,0.06)]"
        >

          {/* Invite Code */}
          <div className="mb-8 p-5 bg-brand-pink/60 rounded-2xl border border-brand-border">
            <label className="block text-[10px] font-semibold tracking-[0.2em] text-brand-espresso mb-2">
              5-DIGIT INVITE CODE *
            </label>

            <div className="relative">
              <Key
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray/50"
              />

              <input
                type="text"
                maxLength={5}
                placeholder="E.G. 00000"
                value={form.inviteCode}
                disabled={inviteVerified}
                onChange={(e) =>
                  update(
                    'inviteCode',
                    e.target.value.replace(/\D/g, '')
                  )
                }
                className={`${inputClasses('inviteCode')} pl-11 ${
                  inviteVerified ? 'bg-brand-pink/30' : ''
                }`}
              />
            </div>

            {errors.inviteCode && (
              <p className="text-red-500 text-xs mt-1">
                {errors.inviteCode}
              </p>
            )}

            {!inviteVerified ? (
              <>
                <p className="text-[11px] text-brand-gray/60 mt-2">
                  Please enter the 5-digit passcode provided with your invitation.
                </p>

                <button
                  type="button"
                  onClick={verifyInviteCode}
                  disabled={form.inviteCode.length !== 5}
                  className="w-full mt-4 py-3 bg-brand-gold-light text-brand-black rounded-full text-[11px] font-semibold tracking-[0.15em] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  VERIFY CODE
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 text-brand-green text-xs font-medium mt-3">
                <CircleCheck size={16} />
                Invite code verified
              </div>
            )}
          </div>

          {/* Only show RSVP fields after code has been verified */}
          {inviteVerified && (
            <>
              {/* Name Fields */}
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-[10px] font-semibold tracking-[0.2em] text-brand-espresso mb-2">
                    FIRST NAME *
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Adewale"
                    value={form.firstName}
                    onChange={(e) =>
                      update('firstName', e.target.value)
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
                    placeholder="e.g. Bakare"
                    value={form.lastName}
                    onChange={(e) =>
                      update('lastName', e.target.value)
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
                  placeholder="e.g. adewale@example.com"
                  value={form.email}
                  onChange={(e) =>
                    update('email', e.target.value)
                  }
                  className={inputClasses('email')}
                />

                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Attendance */}
              <div className="mb-6">
                <label className="block text-[10px] font-semibold tracking-[0.2em] text-brand-espresso mb-3">
                  WILL YOU ATTEND? *
                </label>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      value: true,
                      label: "Yes, I'll be there",
                    },
                    {
                      value: false,
                      label: "No, I can't make it",
                    },
                  ].map((option) => (
                    <button
                      key={String(option.value)}
                      type="button"
                      onClick={() =>
                        update('attendance', option.value)
                      }
                      className={`flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all ${
                        form.attendance === option.value
                          ? 'border-brand-gold bg-brand-gold/5'
                          : 'border-brand-border bg-white hover:border-brand-gray/30'
                      }`}
                    >
                      <span className="text-sm text-brand-espresso">
                        {option.label}
                      </span>

                      {form.attendance === option.value && (
                        <CircleCheck
                          size={18}
                          className="text-brand-gold"
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
                  onChange={(e) =>
                    update('message', e.target.value)
                  }
                  className={`${inputClasses(
                    'message'
                  )} resize-none`}
                />
              </div>

              {/* Notice */}
              <div className="text-center mb-8">
                <div className="w-12 h-px bg-brand-border mx-auto mb-4" />

                <p className="text-xs text-brand-gray">
                  Please note that this is strictly an{' '}
                  <strong className="text-brand-espresso">
                    adult-only
                  </strong>{' '}
                  event (No children).
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