import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CLASS_OPTIONS, SECTION_OPTIONS, buildAssociations, useAuth } from "../context/AuthContext";
import logo from "../assets/exocraft-logo.png";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [classes, setClasses] = useState([CLASS_OPTIONS[0]]);
  const [sections, setSections] = useState([SECTION_OPTIONS[0]]);
  const [error, setError] = useState("");
  const associations = useMemo(() => buildAssociations(classes, sections), [classes, sections]);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const toggle = (value, values, setter) => setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const needsSpecialization = classes.some((className) => CLASS_OPTIONS.indexOf(className) >= 3);
    if (Object.values(form).some((value) => !value.trim()) || !classes.length || (needsSpecialization && !sections.length)) return setError("Veuillez renseigner tous les champs et choisir une section pour les classes de spécialité.");
    if (form.password.length < 6) return setError("Le mot de passe doit contenir au moins 6 caractères.");
    if (form.password !== form.confirmPassword) return setError("Les mots de passe ne correspondent pas.");
    const profile = { firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim(), associations };
    localStorage.setItem("exocraft_profile", JSON.stringify(profile));
    login(profile);
    navigate("/dashboard");
  };
  return <div className="auth-page">
    <header className="auth-header"><Link to="/" className="auth-logo-link"><img src={logo} alt="ExoCraft" className="auth-logo" /></Link><div className="auth-header-text"><span>Vous avez déjà un compte ?</span><Link to="/login">Se connecter</Link></div></header>
    <main className="auth-main"><div className="auth-container register-container">
      <div className="auth-heading"><span className="auth-eyebrow">CRÉER VOTRE ESPACE ENSEIGNANT</span><h1>Rejoignez ExoCraft</h1><p>Choisissez les classes et sections que vous enseignez pour organiser vos contenus dès le départ.</p></div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="registration-name-grid"><div className="form-group"><label htmlFor="firstName">Prénom</label><input id="firstName" name="firstName" value={form.firstName} onChange={update} autoComplete="given-name" required /></div><div className="form-group"><label htmlFor="lastName">Nom</label><input id="lastName" name="lastName" value={form.lastName} onChange={update} autoComplete="family-name" required /></div></div>
        <div className="form-group"><label htmlFor="email">Adresse email</label><input type="email" id="email" name="email" value={form.email} placeholder="exemple@email.com" onChange={update} autoComplete="email" required /></div>
        <div className="form-group"><label htmlFor="password">Mot de passe</label><input type="password" id="password" name="password" value={form.password} onChange={update} autoComplete="new-password" required /><span className="auth-input-hint">Minimum 6 caractères</span></div>
        <div className="form-group"><label htmlFor="confirmPassword">Confirmer le mot de passe</label><input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={update} autoComplete="new-password" required /></div>
        <fieldset className="registration-choice"><legend>Classes enseignées</legend><div className="registration-options">{CLASS_OPTIONS.map((item) => <label key={item} className="choice-card"><input type="checkbox" checked={classes.includes(item)} onChange={() => toggle(item, classes, setClasses)} /><span>{item}</span></label>)}</div></fieldset>
        <fieldset className="registration-choice"><legend>Sections de spécialité</legend><div className="registration-options">{SECTION_OPTIONS.map((item) => <label key={item} className="choice-card"><input type="checkbox" checked={sections.includes(item)} onChange={() => toggle(item, sections, setSections)} /><span>{item}</span></label>)}</div><small>Les 1ère, 2ème et 3ème sont en tronc commun. Les sections choisies s’appliquent aux 4ème et 5ème ingénieur.</small></fieldset>
        {error && <div className="auth-error" role="alert">{error}</div>}<button type="submit" className="auth-button"><span>Créer mon compte</span><span>→</span></button>
      </form><div className="auth-bottom"><span>Vous avez déjà un compte ?</span><Link to="/login">Se connecter</Link></div><div className="auth-security"><span>🔒</span><p>Vos informations de compte sont protégées.</p></div>
    </div></main>
  </div>;
}
