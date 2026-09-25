import { useState } from 'react';
import { weddingData } from '../data/weddingData';
import { Key, Send, Check, CircleCheck } from 'lucide-react';

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

  const validate = () => {
    const errs = {};
    if (!form.inviteCode || !/^\d{5}$/.test(form.inviteCode)) {
      errs.inviteCode = 'Please enter a valid 5-digit invite code';
    }
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email';
    }
    if (form.attendance === null) errs.attendance = 'Please select your attendance';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const deadlineDate = new Date(weddingData.rsvpDeadline).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 lg:py-36 px-6" style={{ scrollMarginTop: '100px' }}>
        <div className="max-w-[600px] mx-auto text-center">
          <div className="bg-white rounded-3xl border border-brand-border p-12 shadow-[0_15px_40px_rgba(20,17,12,0.06)]">
            <div className="w-16 h-16 rounded-full bg-brand-PINK #F5ECF1/10 flex items-center justify-center mx-auto mb-6">
              <CircleCheck size={32} className="text-brand-green" />
            </div>
            <h3 className="font-serif text-3xl text-brand-espresso mb-3">Thank You!</h3>
            <p className="text-brand-gray text-sm leading-relaxed">
              Your RSVP has been received. We can&rsquo;t wait to celebrate with you!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const inputClasses = (field) =>
    `w-full px-5 py-3.5 bg-white border ${
      errors[field] ? 'border-red-400' : 'border-brand-border'
    } rounded-xl text-sm text-brand-espresso placeholder:text-brand-gray/50 focus:outline-none focus:border-brand-gold transition-colors`;

  return (
    <section id="rsvp" className="py-24 lg:py-36 px-6" style={{ scrollMarginTop: '100px' }}>
      <div className="max-w-[650px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-brand-WINE #A9008D uppercase mb-4">
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
            Kindly RSVP by <strong className="text-brand-espresso">{deadlineDate}</strong>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-brand-border p-8 lg:p-12 shadow-[0_15px_40px_rgba(20,17,12,0.06)]"
        >
          {/* Invite Code */}
          <div className="mb-8 p-5 bg-brand-pink #F5ECF1/60 rounded-2xl border border-brand-border">
            <label className="block text-[10px] font-semibold tracking-[0.2em] text-brand-espresso mb-2">
              5-DIGIT INVITE CODE *
            </label>
            <div className="relative">
              <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray/50" />
              <input
                type="text"
                maxLength={5}
                placeholder="E.G. 74921"
                value={form.inviteCode}
                onChange={(e) => update('inviteCode', e.target.value.replace(/\D/g, ''))}
                className={`${inputClasses('inviteCode')} pl-11`}
              />
            </div>
            {errors.inviteCode && (
              <p className="text-red-500 text-xs mt-1">{errors.inviteCode}</p>
            )}
            <p className="text-[11px] text-brand-gray/60 mt-2">
              Please enter the unique 5-digit passcode provided with your invitation.
            </p>
          </div>

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
                onChange={(e) => update('firstName', e.target.value)}
                className={inputClasses('firstName')}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
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
                onChange={(e) => update('lastName', e.target.value)}
                className={inputClasses('lastName')}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
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
              onChange={(e) => update('email', e.target.value)}
              className={inputClasses('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Attendance */}
          <div className="mb-6">
            <label className="block text-[10px] font-semibold tracking-[0.2em] text-brand-espresso mb-3">
              WILL YOU ATTEND? *
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {[{ value: true, label: "Yes, I'll be there" }, { value: false, label: "No, I can't make it" }].map(
                (option) => (
                  <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => update('attendance', option.value)}
                    className={`flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all ${
                      form.attendance === option.value
                        ? 'border-brand-gold bg-brand-gold/5'
                        : 'border-brand-border bg-white hover:border-brand-gray/30'
                    }`}
                  >
                    <span className="text-sm text-brand-espresso">{option.label}</span>
                    {form.attendance === option.value && (
                      <CircleCheck size={18} className="text-brand-gold" />
                    )}
                  </button>
                )
              )}
            </div>
            {errors.attendance && (
              <p className="text-red-500 text-xs mt-1">{errors.attendance}</p>
            )}
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className="block text-[10px] font-semibold tracking-[0.2em] text-brand-espresso mb-2">
              MESSAGE FOR THE COUPLE{' '}
              <span className="text-brand-gray font-normal">(optional)</span>
            </label>
            <textarea
              rows={4}
              placeholder={`Share a sweet note, prayers, or well wishes for ${weddingData.couple.partner2} & ${weddingData.couple.partner1}...`}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className={`${inputClasses('message')} resize-none`}
            />
          </div>

          {/* Notice */}
          <div className="text-center mb-8">
            <div className="w-12 h-px bg-brand-border mx-auto mb-4" />
            <p className="text-xs text-brand-gray">
              Please note that this is strictly an{' '}
              <strong className="text-brand-espresso">adult-only</strong> event (No children).
            </p>
            <div className="w-12 h-px bg-brand-border mx-auto mt-4" />
          </div>

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
        </form>
      </div>
    </section>
  );
}
