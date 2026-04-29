import { useEffect, useState } from "react";
import { getSiteConfig, updateSiteConfig, SiteConfig } from "../../services/api";

export default function SiteConfigAdmin() {
  const [config, setConfig] = useState<SiteConfig>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingValues, setEditingValues] = useState<SiteConfig>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const data = await getSiteConfig();
      setConfig(data);
      setEditingValues(data);
    } catch (err) {
      setError(`Failed to load config: ${(err as Error).message}`);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      await updateSiteConfig(editingValues);
      setConfig(editingValues);
      setIsEditing(false);
      setSuccess("Configuration saved successfully!");
    } catch (err) {
      setError(`Failed to save config: ${(err as Error).message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingValues(config);
    setIsEditing(false);
    setError(null);
  };

  const configSections = [
    {
      title: "Site Information",
      fields: ["site.name", "site.tagline", "site.description"],
    },
    {
      title: "Contact Information",
      fields: ["contact.email", "contact.phone", "contact.location", "contact.region"],
    },
    {
      title: "Social & Integration",
      fields: ["social.whatsapp"],
    },
    {
      title: "Homepage Hero Section",
      fields: ["hero.heading", "hero.subheading"],
    },
    {
      title: "Legal",
      fields: ["copyright.year"],
    },
  ];

  const getFieldLabel = (key: string): string => {
    const labels: Record<string, string> = {
      "site.name": "Site Name",
      "site.tagline": "Tagline",
      "site.description": "Description",
      "contact.email": "Email",
      "contact.phone": "Phone",
      "contact.location": "Location",
      "contact.region": "Region",
      "social.whatsapp": "WhatsApp Number",
      "hero.heading": "Hero Heading",
      "hero.subheading": "Hero Subheading",
      "copyright.year": "Copyright Year",
    };
    return labels[key] || key;
  };

  const isTextarea = (key: string): boolean => {
    return key.includes("description") || key.includes("subheading");
  };

  return (
    <section className="card space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl">Site Configuration (Admin)</h3>
          <p className="text-sm text-[var(--text-soft)]">Manage global site settings and content without code.</p>
        </div>
        <div className="flex gap-2">
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="btn">
              Edit Configuration
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-400/40 bg-green-500/10 p-4 text-sm text-green-200">
          {success}
        </div>
      )}

      {!isEditing ? (
        <div className="space-y-6">
          {configSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 font-medium text-[var(--text)]">{section.title}</h4>
              <div className="space-y-2">
                {section.fields.map((field) => (
                  <div key={field} className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-3">
                    <p className="text-xs uppercase tracking-wide text-[var(--text-soft)]">{getFieldLabel(field)}</p>
                    <p className="mt-1 text-sm text-[var(--text)]">{config[field] || "(not set)"}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {configSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 font-medium text-[var(--text)]">{section.title}</h4>
              <div className="space-y-3">
                {section.fields.map((field) => (
                  <label key={field} className="field-label">
                    {getFieldLabel(field)}
                    {isTextarea(field) ? (
                      <textarea
                        value={editingValues[field] || ""}
                        onChange={(e) => setEditingValues({ ...editingValues, [field]: e.target.value })}
                        className="input"
                        rows={3}
                        placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={editingValues[field] || ""}
                        onChange={(e) => setEditingValues({ ...editingValues, [field]: e.target.value })}
                        className="field-input"
                        placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-2 border-t border-[var(--line)] pt-4">
            <button onClick={handleSave} disabled={isSaving} className="btn disabled:opacity-60">
              {isSaving ? "Saving..." : "Save Configuration"}
            </button>
            <button onClick={handleCancel} className="btn border">
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
