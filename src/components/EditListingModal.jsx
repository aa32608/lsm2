import { useState, useEffect } from 'react';
import { ref as dbRef, set } from 'firebase/database';
import { db } from '../firebase';
import { buildLocationString, stripDangerous } from '../utils';

export default function EditListingModal({
  listing,
  editForm,
  setEditForm,
  onClose,
  onSave,
  showMapPicker,
  setShowEditMapPicker,
  t,
  categories,
  mkCities,
  user,
  plan,
  accountPhone
}) {
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(listing?.imagePreview || editForm?.imagePreview || null);

  useEffect(() => {
    if (listing && !editForm) {
      setEditForm({
        name: listing.name || '',
        category: listing.category || '',
        locationCity: listing.locationCity || '',
        locationExtra: listing.locationExtra || '',
        locationData: listing.locationData || null,
        description: listing.description || '',
        offerprice: listing.offerprice || '',
        tags: listing.tags || '',
        socialLink: listing.socialLink || '',
        contact: listing.contact || '',
        imagePreview: listing.imagePreview || null,
        plan: listing.plan || plan || '1'
      });
      setPreview(listing.imagePreview || null);
    }
  }, [listing, editForm, setEditForm, plan]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // File selected for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setEditForm(prev => ({ ...prev, imagePreview: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleLocationSelect = (city, extra, data) => {
    setEditForm(prev => ({
      ...prev,
      locationCity: city,
      locationExtra: extra,
      locationData: data
    }));
    setShowEditMapPicker(false);
  };

  const validateForm = () => {
    if (!editForm?.name?.trim()) return t('nameRequired') || 'Name is required';
    if (!editForm?.category) return t('categoryRequired') || 'Category is required';
    if (!editForm?.locationCity) return t('locationRequired') || 'Location is required';
    if (!editForm?.description?.trim()) return t('descriptionRequired') || 'Description is required';
    if (editForm?.contact && !/^\+?[\d\s\-()]{6,}$/.test(editForm.contact)) {
      return t('invalidContact') || 'Invalid contact number';
    }
    return null;
  };

  const handleSave = async () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    setSaving(true);
    try {
      const finalLocation = buildLocationString(editForm.locationCity, editForm.locationExtra);
      const phoneForListing = editForm.contact || accountPhone || listing.contact;

      const updates = {
        name: stripDangerous(editForm.name),
        category: editForm.category,
        location: finalLocation,
        locationCity: editForm.locationCity,
        locationExtra: editForm.locationExtra,
        locationData: editForm.locationData || null,
        description: stripDangerous(editForm.description),
        offerprice: editForm.offerprice || '',
        tags: stripDangerous(editForm.tags || ''),
        socialLink: stripDangerous(editForm.socialLink || ''),
        contact: phoneForListing,
        imagePreview: preview,
        updatedAt: Date.now(),
        updatedBy: user?.uid || null
      };

      if (listing?.id) {
        await set(dbRef(db, `listings/${listing.id}`), {
          ...listing,
          ...updates
        });
      }

      onSave(updates);
      onClose();
    } catch (error) {
      console.error('Error saving listing:', error);
      alert(t('saveError') || 'Error saving listing');
    } finally {
      setSaving(false);
    }
  };

  if (!listing || !editForm) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content edit-listing-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{t('editListing') || 'Edit Listing'}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>{t('name') || 'Name'} *</label>
            <input
              type="text"
              value={editForm.name}
              onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder={t('namePlaceholder') || 'Enter listing name'}
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label>{t('category') || 'Category'} *</label>
            <select
              value={editForm.category}
              onChange={e => setEditForm(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="">{t('selectCategory') || 'Select category'}</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{t(cat) || cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>{t('location') || 'Location'} *</label>
            <div className="location-input-group">
              <select
                value={editForm.locationCity}
                onChange={e => setEditForm(prev => ({ ...prev, locationCity: e.target.value }))}
              >
                <option value="">{t('selectCity') || 'Select city'}</option>
                {mkCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <button
                type="button"
                className="map-picker-button"
                onClick={() => setShowEditMapPicker(true)}
                title={t('pickOnMap') || 'Pick on map'}
              >
                📍
              </button>
            </div>
            <input
              type="text"
              value={editForm.locationExtra}
              onChange={e => setEditForm(prev => ({ ...prev, locationExtra: e.target.value }))}
              placeholder={t('areaNeighborhood') || 'Area or neighborhood'}
              maxLength={100}
            />
            {editForm.locationCity && (
              <div className="location-preview">
                📍 {buildLocationString(editForm.locationCity, editForm.locationExtra)}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>{t('description') || 'Description'} *</label>
            <textarea
              value={editForm.description}
              onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder={t('descriptionPlaceholder') || 'Describe your service...'}
              rows={4}
              maxLength={1000}
            />
            <div className="char-counter">{editForm.description.length}/1000</div>
          </div>

          <div className="form-group">
            <label>{t('price') || 'Price'}</label>
            <input
              type="text"
              value={editForm.offerprice}
              onChange={e => setEditForm(prev => ({ ...prev, offerprice: e.target.value }))}
              placeholder={t('pricePlaceholder') || 'e.g., 1000 MKD / hour'}
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label>{t('contact') || 'Contact'}</label>
            <input
              type="tel"
              value={editForm.contact}
              onChange={e => setEditForm(prev => ({ ...prev, contact: e.target.value }))}
              placeholder={accountPhone ? `${t('leaveEmptyForAccount') || 'Leave empty to use account phone'} (${accountPhone})` : t('contactPlaceholder') || 'Phone number'}
            />
          </div>

          <div className="form-group">
            <label>{t('tags') || 'Tags'}</label>
            <input
              type="text"
              value={editForm.tags}
              onChange={e => setEditForm(prev => ({ ...prev, tags: e.target.value }))}
              placeholder={t('tagsPlaceholder') || 'e.g., plumbing, emergency, 24h'}
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label>{t('socialLink') || 'Social Link'}</label>
            <input
              type="url"
              value={editForm.socialLink}
              onChange={e => setEditForm(prev => ({ ...prev, socialLink: e.target.value }))}
              placeholder={t('socialLinkPlaceholder') || 'https://facebook.com/...'}
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label>{t('image') || 'Image'}</label>
            <div className="image-upload-group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                id="edit-image-upload"
              />
              <label htmlFor="edit-image-upload" className="file-input-label">
                {t('chooseImage') || 'Choose Image'}
              </label>
              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="Preview" />
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={() => {
                      setPreview(null);
                      setEditForm(prev => ({ ...prev, imagePreview: null }));
                      // Clear file reference
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>{t('plan') || 'Plan'}</label>
            <div className="plan-indicator">
              <span className={`pill pill-${editForm.plan === '3' ? 'success' : editForm.plan === '6' ? 'warning' : 'info'}`}>
                {editForm.plan} {t('months') || 'months'}
              </span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="button button-secondary"
            onClick={onClose}
            disabled={saving}
          >
            {t('cancel') || 'Cancel'}
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (t('saving') || 'Saving...') : (t('save') || 'Save')}
          </button>
        </div>

        {showMapPicker && (
          <div className="map-picker-modal">
            <div className="map-picker-header">
              <h4>{t('selectLocation') || 'Select Location'}</h4>
              <button className="close-button" onClick={() => setShowEditMapPicker(false)}>×</button>
            </div>
            <div className="map-picker-content">
              <div className="city-selector">
                {mkCities.map(city => (
                  <button
                    key={city}
                    className={`city-button ${editForm.locationCity === city ? 'active' : ''}`}
                    onClick={() => handleLocationSelect(city, editForm.locationExtra, null)}
                  >
                    {city}
                  </button>
                ))}
              </div>
              <div className="neighborhood-input">
                <input
                  type="text"
                  value={editForm.locationExtra}
                  onChange={e => setEditForm(prev => ({ ...prev, locationExtra: e.target.value }))}
                  placeholder={t('neighborhoodArea') || 'Neighborhood or area'}
                />
                <button
                  className="button button-primary"
                  onClick={() => handleLocationSelect(editForm.locationCity, editForm.locationExtra, null)}
                >
                  {t('confirm') || 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}