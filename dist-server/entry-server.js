var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { Component, useState, useEffect, lazy, useCallback, useDeferredValue, useMemo, Suspense } from "react";
import ReactDOMServer from "react-dom/server";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, isSignInWithEmailLink, signInWithEmailLink, signOut, sendEmailVerification, signInWithEmailAndPassword, signInWithPhoneNumber, EmailAuthProvider, linkWithCredential, updateProfile, reauthenticateWithCredential, PhoneAuthProvider, updatePhoneNumber, deleteUser, updateEmail, updatePassword } from "firebase/auth";
import { getDatabase, update, ref, onValue, query, orderByChild, equalTo, limitToLast, get, push, set, remove } from "firebase/database";
import { AnimatePresence, motion } from "framer-motion";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const logo = "/assets/logo-DpWurNp1.png";
const firebaseConfig = {
  apiKey: void 0,
  authDomain: void 0,
  databaseURL: "https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: void 0,
  storageBucket: void 0,
  messagingSenderId: void 0,
  appId: void 0
};
let app;
let auth;
let db;
try {
  if (!firebaseConfig.apiKey && typeof window === "undefined") {
    console.warn("Firebase API key missing in SSR. Using mock.");
    app = {};
    auth = {};
    db = {};
  } else {
    app = initializeApp(firebaseConfig);
    if (typeof window !== "undefined") {
      auth = getAuth(app);
      db = getDatabase(app);
    } else {
      auth = getAuth(app);
      db = getDatabase(app);
    }
  }
} catch (e) {
  console.warn("Firebase initialization failed:", e);
  app = {};
  auth = {};
  db = {};
}
function createRecaptcha(containerId = "recaptcha-container") {
  if (typeof window === "undefined") return null;
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      // ✅ FIRST: auth
      containerId,
      // ✅ SECOND: container ID
      {
        size: "invisible",
        callback: () => {
        }
      }
    );
    window.recaptchaVerifier.render();
  }
  return window.recaptchaVerifier;
}
const ListingCard = React.memo(({
  listing: l,
  t,
  categoryIcons: categoryIcons2,
  getDescriptionPreview: getDescriptionPreview2,
  getListingStats,
  onSelect,
  onShare,
  className = ""
}) => {
  const stats = getListingStats(l);
  const [imgIndex, setImgIndex] = useState(0);
  const images = l.images && l.images.length > 0 ? l.images : l.imagePreview ? [l.imagePreview] : [];
  const handlePrev = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
  };
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: `listing-card explore-card-modern ${className}`,
      onClick: () => onSelect(l),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "listing-card-image-container", children: [
          images.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: images[imgIndex],
                alt: `${l.name}`,
                className: "listing-card-image",
                loading: "lazy"
              }
            ),
            images.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("button", { className: "carousel-btn prev", onClick: handlePrev, children: "‹" }),
              /* @__PURE__ */ jsx("button", { className: "carousel-btn next", onClick: handleNext, children: "›" }),
              /* @__PURE__ */ jsx("div", { className: "carousel-dots", children: images.map((_, idx) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: `carousel-dot ${idx === imgIndex ? "active" : ""}`
                },
                idx
              )) })
            ] })
          ] }) : /* @__PURE__ */ jsx("div", { className: "listing-card-placeholder", children: categoryIcons2[l.category] || "🏷️" }),
          /* @__PURE__ */ jsxs("div", { style: { position: "absolute", top: "10px", left: "10px", right: "10px", display: "flex", justifyContent: "space-between", zIndex: 4, pointerEvents: "none" }, children: [
            /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: "6px" }, children: l.offerprice && /* @__PURE__ */ jsx("span", { className: "pill pill-price", style: { boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }, children: l.offerprice }) }),
            /* @__PURE__ */ jsxs("span", { className: "badge verified", style: { background: "rgba(255,255,255,0.95)", backdropFilter: "blur(4px)", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", color: "#0f172a" }, children: [
              "✓ ",
              t("verified")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "listing-card-content", style: { padding: "0 8px 8px 8px" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: "8px" }, children: [
            /* @__PURE__ */ jsx("h3", { className: "listing-title", style: { fontSize: "1.1rem", marginBottom: "4px" }, children: l.name }),
            /* @__PURE__ */ jsxs("div", { className: "listing-meta pill-row-tight", children: [
              /* @__PURE__ */ jsx("span", { className: "pill pill-category", children: t(l.category) || l.category }),
              /* @__PURE__ */ jsxs("span", { className: "pill pill-location", children: [
                "📍 ",
                l.location || t("unspecified")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "listing-description listing-description-clamp listing-description-preview", style: { marginBottom: "12px" }, children: getDescriptionPreview2(l.description, 30) }),
          /* @__PURE__ */ jsxs("div", { className: "listing-stats spaced", children: [
            /* @__PURE__ */ jsxs("span", { className: "stat-chip rating", children: [
              "⭐ ",
              Number(stats.avgRating || 0).toFixed(1)
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "stat-chip", children: [
              "💬 ",
              stats.feedbackCount
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "stat-chip subtle", children: [
              "🔥 ",
              stats.engagement
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "listing-footer-row", onClick: (e) => e.stopPropagation(), style: { marginTop: "auto", paddingTop: "12px", borderTop: "1px solid var(--border)", paddingLeft: "8px", paddingRight: "8px" }, children: [
          /* @__PURE__ */ jsx("div", { className: "listing-footer-left", children: l.contact && /* @__PURE__ */ jsxs("span", { className: "pill pill-contact ghost-pill", children: [
            "📞 ",
            l.contact
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "listing-actions compact", children: [
            l.contact && /* @__PURE__ */ jsx(
              "button",
              {
                className: "icon-btn",
                type: "button",
                onClick: () => window.open(`tel:${l.contact}`),
                "aria-label": t("callAction"),
                children: "📞"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "icon-btn",
                type: "button",
                onClick: () => window.open(
                  `mailto:${l.userEmail || ""}?subject=Regarding%20${encodeURIComponent(
                    l.name || ""
                  )}`
                ),
                "aria-label": t("emailAction"),
                children: "✉️"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "icon-btn",
                type: "button",
                onClick: () => onShare(l),
                "aria-label": t("share"),
                children: "🔗"
              }
            )
          ] })
        ] })
      ]
    }
  );
});
const Filtersheet$1 = React.memo(({
  t,
  filtersOpen,
  setFiltersOpen,
  q,
  setQ,
  catFilter,
  setCatFilter,
  locFilter,
  setLocFilter,
  sortBy,
  setSortBy,
  categories: categories2,
  categoryIcons: categoryIcons2,
  allLocations,
  // Optional filters for My Listings
  statusFilter,
  setStatusFilter,
  expiryFilter,
  setExpiryFilter
}) => {
  const [localSearch, setLocalSearch] = useState(q);
  const [localCat, setLocalCat] = useState(catFilter);
  const [localLoc, setLocalLoc] = useState(locFilter);
  const [localSort, setLocalSort] = useState(sortBy);
  useEffect(() => {
    setLocalSearch(q);
  }, [q]);
  useEffect(() => {
    setLocalCat(catFilter);
  }, [catFilter]);
  useEffect(() => {
    setLocalLoc(locFilter);
  }, [locFilter]);
  useEffect(() => {
    setLocalSort(sortBy);
  }, [sortBy]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== q) setQ(localSearch);
      if (localCat !== catFilter) setCatFilter(localCat);
      if (localLoc !== locFilter) setLocFilter(localLoc);
      if (localSort !== sortBy) setSortBy(localSort);
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearch, localCat, localLoc, localSort, q, catFilter, locFilter, sortBy, setQ, setCatFilter, setLocFilter, setSortBy]);
  if (!filtersOpen) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "filter-sheet-backdrop",
        onClick: () => setFiltersOpen(false),
        "aria-label": t("closeFilters")
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "filter-sheet-wrapper", children: [
      /* @__PURE__ */ jsx("div", { className: "filter-sheet-handle", onClick: () => setFiltersOpen(false), children: /* @__PURE__ */ jsx("div", { className: "filter-sheet-handle-bar" }) }),
      /* @__PURE__ */ jsxs("div", { className: "filter-sheet-content", children: [
        /* @__PURE__ */ jsxs("div", { className: "filter-sheet-header", children: [
          /* @__PURE__ */ jsxs("div", { className: "filter-sheet-header-left", children: [
            /* @__PURE__ */ jsx("div", { className: "filter-sheet-icon", children: "🔍" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "filter-sheet-title", children: t("filters") }),
              /* @__PURE__ */ jsx("p", { className: "filter-sheet-subtitle", children: t("filterSubtitle") })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "filter-sheet-close",
              onClick: () => setFiltersOpen(false),
              "aria-label": t("closeFilters"),
              children: /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { minWidth: "24px" }, children: [
                /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "filter-sheet-scroll", children: [
          /* @__PURE__ */ jsxs("div", { className: "filter-group", children: [
            /* @__PURE__ */ jsxs("div", { className: "filter-group-header", children: [
              /* @__PURE__ */ jsx("span", { className: "filter-group-icon", children: "🔎" }),
              /* @__PURE__ */ jsx("span", { className: "filter-group-title", children: t("search") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "filter-group-content", children: /* @__PURE__ */ jsxs("div", { className: "filter-search-box", children: [
              /* @__PURE__ */ jsxs("svg", { className: "filter-search-icon", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", style: { minWidth: "24px" }, children: [
                /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
                /* @__PURE__ */ jsx("path", { d: "m21 21-4.35-4.35" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "search",
                  className: "filter-search-input",
                  placeholder: t("searchPlaceholder"),
                  value: localSearch,
                  onChange: (e) => setLocalSearch(e.target.value)
                }
              ),
              localSearch && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "filter-search-clear",
                  onClick: () => {
                    setLocalSearch("");
                    setQ("");
                  },
                  "aria-label": t("clearSearch"),
                  children: /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", style: { minWidth: "24px" }, children: [
                    /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                    /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                  ] })
                }
              )
            ] }) })
          ] }),
          setStatusFilter && /* @__PURE__ */ jsxs("div", { className: "filter-group", children: [
            /* @__PURE__ */ jsxs("div", { className: "filter-group-header", children: [
              /* @__PURE__ */ jsx("span", { className: "filter-group-icon", children: "⏳" }),
              /* @__PURE__ */ jsx("span", { className: "filter-group-title", children: t("status") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "filter-group-content", children: /* @__PURE__ */ jsxs("div", { className: "filter-select-wrapper", children: [
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "filter-select-field",
                  value: statusFilter,
                  onChange: (e) => setStatusFilter(e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "all", children: t("allStatuses") }),
                    /* @__PURE__ */ jsx("option", { value: "verified", children: t("verified") }),
                    /* @__PURE__ */ jsx("option", { value: "pending", children: t("pending") })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "filter-select-arrow", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
            ] }) })
          ] }),
          setExpiryFilter && /* @__PURE__ */ jsxs("div", { className: "filter-group", children: [
            /* @__PURE__ */ jsxs("div", { className: "filter-group-header", children: [
              /* @__PURE__ */ jsx("span", { className: "filter-group-icon", children: "⏰" }),
              /* @__PURE__ */ jsx("span", { className: "filter-group-title", children: t("expiry") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "filter-group-content", children: /* @__PURE__ */ jsxs("div", { className: "filter-select-wrapper", children: [
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "filter-select-field",
                  value: expiryFilter,
                  onChange: (e) => setExpiryFilter(e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "all", children: t("allExpiry") }),
                    /* @__PURE__ */ jsx("option", { value: "expiring", children: t("expiringSoon") }),
                    /* @__PURE__ */ jsx("option", { value: "active", children: t("active") }),
                    /* @__PURE__ */ jsx("option", { value: "expired", children: t("expired") })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "filter-select-arrow", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
            ] }) })
          ] }),
          categories2 && setCatFilter && /* @__PURE__ */ jsxs("div", { className: "filter-group", children: [
            /* @__PURE__ */ jsxs("div", { className: "filter-group-header", children: [
              /* @__PURE__ */ jsx("span", { className: "filter-group-icon", children: "📂" }),
              /* @__PURE__ */ jsx("span", { className: "filter-group-title", children: t("category") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "filter-group-content", children: /* @__PURE__ */ jsx("div", { className: "filter-options-grid", children: categories2.map((cat) => {
              const label = t(cat);
              const active = localCat === label;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  className: `filter-option-card ${active ? "is-selected" : ""}`,
                  onClick: () => setLocalCat(active ? "" : label),
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "filter-option-icon", children: categoryIcons2[cat] }),
                    /* @__PURE__ */ jsx("div", { className: "filter-option-label", children: label }),
                    active && /* @__PURE__ */ jsx("div", { className: "filter-option-check", children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", style: { minWidth: "24" }, children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) })
                  ]
                },
                cat
              );
            }) }) })
          ] }),
          allLocations && setLocFilter && /* @__PURE__ */ jsxs("div", { className: "filter-group", children: [
            /* @__PURE__ */ jsxs("div", { className: "filter-group-header", children: [
              /* @__PURE__ */ jsx("span", { className: "filter-group-icon", children: "📍" }),
              /* @__PURE__ */ jsx("span", { className: "filter-group-title", children: t("location") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "filter-group-content", children: /* @__PURE__ */ jsxs("div", { className: "filter-select-wrapper", children: [
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "filter-select-field",
                  value: localLoc,
                  onChange: (e) => setLocalLoc(e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: t("allLocations") }),
                    allLocations.map((l) => /* @__PURE__ */ jsx("option", { value: l, children: l }, l))
                  ]
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "filter-select-arrow", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "filter-group", children: [
            /* @__PURE__ */ jsxs("div", { className: "filter-group-header", children: [
              /* @__PURE__ */ jsx("span", { className: "filter-group-icon", children: "🔄" }),
              /* @__PURE__ */ jsx("span", { className: "filter-group-title", children: t("sortBy") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "filter-group-content", children: /* @__PURE__ */ jsxs("div", { className: "filter-select-wrapper", children: [
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "filter-select-field",
                  value: localSort,
                  onChange: (e) => setLocalSort(e.target.value),
                  children: [
                    /* @__PURE__ */ jsxs("option", { value: "topRated", children: [
                      "⭐ ",
                      t("sortTopRated")
                    ] }),
                    /* @__PURE__ */ jsxs("option", { value: "newest", children: [
                      "🆕 ",
                      t("sortNewest")
                    ] }),
                    /* @__PURE__ */ jsxs("option", { value: "expiring", children: [
                      "⏰ ",
                      t("sortExpiring")
                    ] }),
                    /* @__PURE__ */ jsxs("option", { value: "az", children: [
                      "🔤 ",
                      t("sortAZ")
                    ] }),
                    setExpiryFilter && /* @__PURE__ */ jsxs("option", { value: "oldest", children: [
                      "📅 ",
                      t("sortOldest")
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "filter-select-arrow", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
            ] }) })
          ] })
        ] })
      ] })
    ] })
  ] });
});
const Filtersheet$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Filtersheet$1
}, Symbol.toStringTag, { value: "Module" }));
function ListingsTab({
  t,
  viewMode,
  setViewMode,
  q,
  setQ,
  catFilter,
  setCatFilter,
  locFilter,
  setLocFilter,
  sortBy,
  setSortBy,
  pagedFiltered,
  page,
  totalPages,
  setPage,
  pageSize,
  setPageSize,
  categoryIcons: categoryIcons2,
  feedbackAverages,
  setSelectedListing,
  filtersOpen,
  setFiltersOpen,
  categories: categories2,
  allLocations,
  // Added for ListingCard
  getDescriptionPreview: getDescriptionPreview2,
  getListingStats,
  handleShareListing,
  showMessage,
  toggleFav,
  favorites
}) {
  return /* @__PURE__ */ jsxs("div", { className: "section all-listings-section", children: [
    /* @__PURE__ */ jsx("div", { className: "section-header-row stacked-mobile", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "section-title-inner", children: [
        "🧭 ",
        t("explore")
      ] }),
      /* @__PURE__ */ jsx("p", { className: "section-subtitle-small", children: t("exploreSubtitle") })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "explore-layout-container", children: [
      /* @__PURE__ */ jsxs("div", { className: "explore-main-content", children: [
        /* @__PURE__ */ jsxs("div", { className: "filters-bar", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "icon-btn",
              onClick: () => setViewMode(viewMode === "list" ? "grid" : "list"),
              title: viewMode === "list" ? t("switchToGrid") || "Grid View" : t("switchToList") || "List View",
              style: { height: "44px", width: "44px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px" },
              children: viewMode === "list" ? "📱" : "📝"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "icon-btn",
              onClick: () => setFiltersOpen(true),
              title: t("filters") || "Filters",
              style: { height: "44px", width: "44px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px" },
              children: "🔍"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "search",
              className: "input",
              placeholder: t("searchPlaceholder"),
              value: q,
              onChange: (e) => setQ(e.target.value)
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              className: "select",
              value: catFilter,
              onChange: (e) => setCatFilter(e.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: t("allCategories") }),
                categories2 && categories2.map((c) => /* @__PURE__ */ jsx("option", { value: t(c), children: t(c) }, c))
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              className: "select",
              value: locFilter,
              onChange: (e) => setLocFilter(e.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: t("allCities") }),
                allLocations && allLocations.map((city) => /* @__PURE__ */ jsx("option", { value: city, children: city }, city))
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              className: "select",
              value: sortBy,
              onChange: (e) => setSortBy(e.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "newest", children: t("sortNewest") }),
                /* @__PURE__ */ jsx("option", { value: "topRated", children: t("sortTopRated") }),
                /* @__PURE__ */ jsx("option", { value: "expiring", children: t("sortExpiring") }),
                /* @__PURE__ */ jsx("option", { value: "az", children: t("sortAZ") })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: `listing-grid-${viewMode}`, children: pagedFiltered.map((l) => /* @__PURE__ */ jsx(
          ListingCard,
          {
            listing: l,
            t,
            categoryIcons: categoryIcons2,
            getDescriptionPreview: getDescriptionPreview2,
            getListingStats,
            onSelect: () => {
              setSelectedListing(l);
              const url = new URL(window.location.href);
              url.searchParams.set("listing", l.id);
              window.history.replaceState({}, "", url.toString());
            },
            onShare: () => handleShareListing(l),
            showMessage,
            toggleFav,
            isFavorite: favorites.includes(l.id)
          },
          l.id
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "pagination", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn btn-ghost",
              disabled: page <= 1,
              onClick: () => setPage(page - 1),
              children: "←"
            }
          ),
          /* @__PURE__ */ jsxs("span", { children: [
            t("page"),
            " ",
            page,
            " ",
            t("of"),
            " ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn btn-ghost",
              disabled: page >= totalPages,
              onClick: () => setPage(page + 1),
              children: "→"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "explore-sidebar", children: [
        /* @__PURE__ */ jsx("div", { className: "promo-banner-section sidebar-promo", children: /* @__PURE__ */ jsxs("div", { className: "promo-banner-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "promo-text", children: [
            /* @__PURE__ */ jsx("h3", { children: t("promoteYourListing") || "Promote Your Listing" }),
            /* @__PURE__ */ jsx("p", { children: t("promoteYourListingDesc") || "Post your own request, browse hidden gems, or boost your visibility." })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "8px", width: "100%" }, children: [
            /* @__PURE__ */ jsxs("button", { className: "btn btn-primary promo-btn full-width", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }), children: [
              "➕ ",
              t("postService") || "Post Service"
            ] }),
            /* @__PURE__ */ jsxs("button", { className: "btn btn-outline promo-btn full-width", onClick: () => setCatFilter(""), children: [
              "🔍 ",
              t("browseCategories") || "Browse All"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "sidebar-ad-placeholder", children: [
          /* @__PURE__ */ jsx("div", { className: "ad-label", children: "Advertisement" }),
          /* @__PURE__ */ jsxs("div", { className: "ad-content", children: [
            /* @__PURE__ */ jsx("script", { async: true, src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8385998516338936", crossorigin: "anonymous" }),
            /* @__PURE__ */ jsx(
              "ins",
              {
                className: "adsbygoogle",
                style: { display: "block" },
                "data-ad-client": "ca-pub-8385998516338936",
                "data-ad-slot": "1802538697",
                "data-ad-format": "auto",
                "data-full-width-responsive": "true"
              }
            ),
            /* @__PURE__ */ jsxs("script", { children: [
              "(adsbygoogle = window.adsbygoogle || []).push(",
              ");"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Filtersheet$1,
      {
        t,
        filtersOpen,
        setFiltersOpen,
        q,
        setQ,
        catFilter,
        setCatFilter,
        locFilter,
        setLocFilter,
        sortBy,
        setSortBy,
        categories: categories2,
        categoryIcons: categoryIcons2,
        allLocations
      }
    )
  ] });
}
const MyListingCard = React.memo(({
  listing: l,
  t,
  categoryIcons: categoryIcons2,
  getDaysUntilExpiry,
  getListingStats,
  getDescriptionPreview: getDescriptionPreview2,
  setSelectedListing,
  openEdit,
  startExtendFlow,
  showMessage,
  handleShareListing,
  confirmDelete
}) => {
  var _a2;
  const stats = getListingStats(l);
  const days = getDaysUntilExpiry(l.expiresAt);
  const isExpiringSoon = days !== null && days > 0 && days <= 7;
  const isExpired = days !== null && days <= 0;
  return /* @__PURE__ */ jsxs("article", { className: "listing-card my-listing-card elevated", children: [
    /* @__PURE__ */ jsxs("header", { className: "listing-header my-listing-header rich-header", children: [
      /* @__PURE__ */ jsx("div", { className: "listing-icon-bubble", children: categoryIcons2[l.category] || "🏷️" }),
      /* @__PURE__ */ jsxs("div", { className: "listing-header-main", children: [
        /* @__PURE__ */ jsxs("div", { className: "listing-title-row spaced", children: [
          /* @__PURE__ */ jsx("h3", { className: "listing-title", children: l.name }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `status-chip ${l.status === "verified" ? "status-chip-verified" : "status-chip-pending"}`,
              children: l.status === "verified" ? `✅ ${t("verified")}` : `⏳ ${t("pending")}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "listing-meta-row pill-row-tight", children: [
          /* @__PURE__ */ jsxs("span", { className: "pill pill-category", children: [
            categoryIcons2[l.category] || "🏷️",
            " ",
            t(l.category) || l.category
          ] }),
          l.location && /* @__PURE__ */ jsxs("span", { className: "pill pill-location", children: [
            "📍 ",
            l.location
          ] }),
          l.createdAt && /* @__PURE__ */ jsxs("span", { className: "pill pill-soft pill-date", children: [
            "📅 ",
            new Date(l.createdAt).toLocaleDateString()
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `listing-expiry-info ${isExpiringSoon ? "expiring-soon" : ""} ${isExpired ? "expired" : ""}`, children: l.expiresAt ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("span", { className: "expiry-label", children: [
            t("expires"),
            ":"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "expiry-date", children: new Date(l.expiresAt).toLocaleDateString() }),
          days !== null && /* @__PURE__ */ jsx("span", { className: `expiry-days ${isExpiringSoon ? "warning" : ""} ${isExpired ? "expired-text" : ""}`, children: isExpired ? ` ⚠️ ${t("expired")}` : isExpiringSoon ? ` ⏰ ${days} ${days === 1 ? t("day") : t("days")} ${t("remaining")}` : ` (${days} ${days === 1 ? t("day") : t("days")})` })
        ] }) : /* @__PURE__ */ jsx("span", { className: "expiry-date", children: t("noExpiry") }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "listing-score-pill", children: [
        /* @__PURE__ */ jsxs("span", { className: "score-main", children: [
          "⭐ ",
          Number(stats.avgRating || 0).toFixed(1)
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "score-sub", children: [
          stats.feedbackCount,
          " ",
          t("reviews")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "listing-card-body-enhanced", children: [
      /* @__PURE__ */ jsx("p", { className: "listing-description clamp-3 enhanced-copy", children: getDescriptionPreview2(l.description, 15) }),
      /* @__PURE__ */ jsxs("div", { className: "listing-stats ribboned", children: [
        /* @__PURE__ */ jsxs("span", { className: "stat-chip rating", children: [
          "⭐ ",
          Number(stats.avgRating || 0).toFixed(1)
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "stat-chip", children: [
          "💬 ",
          stats.feedbackCount
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "stat-chip subtle", children: [
          "🔥 ",
          stats.engagement
        ] }),
        l.offerprice && /* @__PURE__ */ jsxs("span", { className: "pill pill-price subtle-pill", children: [
          "💶 ",
          l.offerprice
        ] })
      ] }),
      (l.tags || l.contact) && /* @__PURE__ */ jsxs("div", { className: "my-listing-highlights rich-highlights", children: [
        l.tags && /* @__PURE__ */ jsxs("span", { className: "pill pill-tags", children: [
          "🏷️ ",
          ((_a2 = l.tags.split(",")[0]) == null ? void 0 : _a2.trim()) || l.tags
        ] }),
        l.contact && /* @__PURE__ */ jsxs("span", { className: "pill pill-contact", children: [
          "📞 ",
          l.contact
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "my-listing-footer framed-footer", children: [
      /* @__PURE__ */ jsxs("div", { className: "listing-actions-primary", children: [
        /* @__PURE__ */ jsxs("span", { className: "listing-id-tiny", style: { fontSize: "0.7rem", color: "#94a3b8", marginRight: "auto", alignSelf: "center" }, children: [
          "#",
          l.id.slice(-6)
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "btn btn-primary small",
            onClick: () => {
              setSelectedListing(l);
              const url = new URL(window.location.href);
              url.searchParams.set("listing", l.id);
              window.history.replaceState({}, "", url.toString());
            },
            children: [
              "👁️ ",
              t("view")
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "btn small",
            onClick: () => openEdit(l),
            children: [
              "✏️ ",
              t("edit")
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "btn small btn-extend",
            onClick: () => startExtendFlow(l),
            children: [
              "⏰ ",
              t("extend")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "listing-actions-secondary", children: [
        l.contact && /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-ghost small icon-only",
            onClick: () => window.open(`tel:${l.contact}`),
            title: t("call"),
            "aria-label": t("call"),
            children: "📞"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-ghost small icon-only",
            onClick: () => window.open(
              `mailto:${l.userEmail || ""}?subject=Regarding%20${encodeURIComponent(
                l.name || ""
              )}`
            ),
            title: t("emailAction"),
            "aria-label": t("emailAction"),
            children: "✉️"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-ghost small icon-only",
            onClick: () => {
              var _a3;
              (_a3 = navigator.clipboard) == null ? void 0 : _a3.writeText(l.contact || "");
              showMessage(t("copied"), "success");
            },
            title: t("copy"),
            "aria-label": t("copy"),
            children: "📋"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-ghost small icon-only",
            onClick: () => handleShareListing && handleShareListing(l),
            title: t("share"),
            "aria-label": t("share"),
            children: "🔗"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-ghost small icon-only",
            onClick: () => confirmDelete && confirmDelete(l.id),
            title: t("confirmDelete"),
            "aria-label": t("confirmDelete"),
            children: "🗑️"
          }
        )
      ] })
    ] })
  ] });
});
function HomeTab({
  t,
  setShowPostForm,
  setForm,
  setSelectedTab,
  categoryIcons: categoryIcons2,
  mkSpotlightCities: mkSpotlightCities2,
  activeListingCount,
  verifiedListingCount,
  verifiedListings = [],
  favorites = [],
  toggleFav,
  handleSelectListing,
  handleShareListing,
  showMessage,
  getDescriptionPreview: getDescriptionPreview2,
  getListingStats,
  ListingCard: ListingCard2,
  setCatFilter,
  setLocFilter
}) {
  return /* @__PURE__ */ jsxs("div", { className: "app-main-content", children: [
    /* @__PURE__ */ jsxs("section", { className: "home-hero-compact", children: [
      /* @__PURE__ */ jsx("h1", { children: t("homeSimpleTitle") }),
      /* @__PURE__ */ jsx("p", { children: t("homeSimpleSubtitle") }),
      /* @__PURE__ */ jsxs("div", { className: "hero-simple-ctas", style: { justifyContent: "center" }, children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "btn btn-primary",
            onClick: () => {
              setShowPostForm(true);
              setForm((f) => ({ ...f, step: 1 }));
            },
            children: [
              "📝 ",
              t("homeSimpleCtaPost")
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "btn btn-outline",
            onClick: () => setSelectedTab("allListings"),
            children: [
              "🔍 ",
              t("homeSimpleCtaBrowse")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("p", { style: { marginTop: "1rem", fontSize: "0.8rem", opacity: 0.8 }, children: [
        "💡 ",
        t("homeSimpleTrustLine")
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "how-it-works-section", style: { marginTop: "2rem" }, children: [
      /* @__PURE__ */ jsxs("h3", { children: [
        "✨ ",
        t("homeHowItWorksTitle")
      ] }),
      /* @__PURE__ */ jsx("div", { className: "steps-row", children: [1, 2, 3].map((step) => /* @__PURE__ */ jsxs("div", { className: "step-card", children: [
        /* @__PURE__ */ jsx("div", { className: "step-number", children: step }),
        /* @__PURE__ */ jsx("p", { className: "step-desc", children: step === 1 ? t("homeHowItWorksStep1") : step === 2 ? t("homeHowItWorksStep2") : t("homeHowItWorksStep3") })
      ] }, step)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "discovery-grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "discovery-card", children: [
        /* @__PURE__ */ jsx("div", { className: "discovery-header", children: /* @__PURE__ */ jsxs("h3", { children: [
          "🎯 ",
          t("homePopularCategoriesTitle")
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "discovery-chips-grid", children: Object.keys(categoryIcons2).map((cat) => /* @__PURE__ */ jsxs(
          "button",
          {
            className: "discovery-chip",
            onClick: () => {
              setCatFilter(t(cat));
              setSelectedTab("allListings");
            },
            children: [
              /* @__PURE__ */ jsx("span", { className: "chip-icon", children: categoryIcons2[cat] }),
              /* @__PURE__ */ jsx("span", { className: "chip-label", children: t(cat) })
            ]
          },
          cat
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "discovery-card", children: [
        /* @__PURE__ */ jsx("div", { className: "discovery-header", children: /* @__PURE__ */ jsxs("h3", { children: [
          "📍 ",
          t("homePopularCitiesTitle")
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "cities-grid", children: mkSpotlightCities2.slice(0, 9).map((city) => /* @__PURE__ */ jsxs(
          "button",
          {
            className: "city-tile",
            onClick: () => {
              setLocFilter(city);
              setSelectedTab("allListings");
            },
            children: [
              /* @__PURE__ */ jsx("span", { className: "city-icon", children: "🏙️" }),
              /* @__PURE__ */ jsx("span", { className: "city-name", children: city })
            ]
          },
          city
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "stats-section", style: { marginTop: "1.5rem", marginBottom: "1rem" }, children: [
      /* @__PURE__ */ jsxs("h3", { style: { fontSize: "1rem", opacity: 0.8, marginBottom: "0.5rem" }, children: [
        "📊 ",
        t("homeDigest")
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "stats-grid", style: { gap: "0.5rem" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "stat-item", style: { padding: "0.75rem" }, children: [
          /* @__PURE__ */ jsx("p", { className: "stat-value blue", style: { fontSize: "1.25rem" }, children: activeListingCount }),
          /* @__PURE__ */ jsx("p", { className: "stat-label", style: { fontSize: "0.8rem" }, children: t("listingsLabel") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "stat-item", style: { padding: "0.75rem" }, children: [
          /* @__PURE__ */ jsx("p", { className: "stat-value green", style: { fontSize: "1.25rem" }, children: verifiedListingCount }),
          /* @__PURE__ */ jsx("p", { className: "stat-label", style: { fontSize: "0.8rem" }, children: t("verified") })
        ] })
      ] })
    ] })
  ] });
}
const TRANSLATIONS = {
  en: {
    // Cookie Consent
    cookieConsentText: "We use cookies to ensure you get the best experience on our website.",
    accept: "Accept",
    maxImagesError: "Maksimumi 4 imazhe lejohen",
    // General
    ",": ",",
    noMyListings: "You have no listings yet",
    myListingsSubtitle: "Manage your active and expired listings",
    exploreSubtitle: "Browse all verified listings in your area",
    saveChanges: "Save Changes",
    allRightsReserved: "All rights reserved.",
    madeWithLove: "Made with love in North Macedonia",
    version: "Version",
    build: "Build",
    cookiesPolicy: "Cookies Policy",
    differentEmailRequired: "Please enter a different email address",
    verifyCurrentEmailBeforeChange: "Please verify your current email address before changing it.",
    emailChangeRestricted: "Email change is not available for this account.",
    emailChangeFailed: "Email change failed. Please try again.",
    recentLoginRequired: "Please log out and log in again before changing your email.",
    emailEnumProtection: "Email changes are blocked by security settings.",
    phoneAlreadyInUse: "This phone number is already in use by another account.",
    reauthRequired: "Please log out and log in again to delete your account.",
    images: "Images",
    uploadImages: "Upload Images",
    title: "Local Support Market",
    appName: "Local Support Market",
    bizcallLogo: "BizCall logo",
    previewAlt: "preview",
    close: "Close",
    welcome: "Welcome!",
    hello: "Hello",
    logout: "Log Out",
    loading: "Loading...",
    cancel: "Cancel",
    save: "Save",
    continue: "Continue",
    back: "Back",
    noListingsYet: "No listings available yet",
    signedOutAs: "Sign out",
    categories: "Categories",
    responsiveLayout: "Responsive layout",
    // Plans
    month1: "1 Month",
    month3: "3 Months",
    month6: "6 Months",
    month12: "12 Months",
    days30: "30 days",
    days90: "90 days",
    days180: "180 days",
    days365: "365 days",
    selectPlan: "Select Plan",
    planBasic: "Basic",
    planStandard: "Standard",
    planPro: "Pro",
    planPremium: "Premium",
    // Header / Navigation
    openDashboard: "Open Dashboard",
    closeDashboard: "Close Dashboard",
    myListings: "My Listings",
    account: "Account",
    explore: "Explore",
    homepage: "Home",
    community: "Community marketplace",
    primaryNav: "Primary navigation",
    // Hero / Landing
    heroTitle: "Find and share trustworthy services across North Macedonia",
    heroSubtitle: "From Skopje to Ohrid, discover locals who can help you today or showcase your own expertise.",
    quickStart: "Quick start",
    heroPanelTitle: "Post with confidence",
    heroPanelSubtitle: "Add your details, pick your plan, and let neighbours reach you with verified contact info.",
    heroPointOne: "Choose a category, city, and a short description.",
    heroPointTwo: "Verify your email or phone for extra trust.",
    heroPointThree: "Highlight your offer and duration to stay visible.",
    homepageReboot: "New responsive hub",
    ctaWatchDemo: "See the tour",
    mobileFirstTitle: "Responsive by default",
    mobileFirstSubtitle: "Layouts collapse gracefully on phones, tablets, and desktops.",
    growthBoardTitle: "Growth playbook",
    growthBoardSubtitle: "Get found faster",
    growthBoardHelper: "Three steps that keep your listing discoverable and above the fold.",
    trafficIdeasTitle: "Traffic ideas",
    trafficIdeasSubtitle: "Keep eyes on your listing",
    trafficIdeasTrending: "Trending carousel",
    trafficIdeasFeedback: "Collect replies",
    trafficIdeasFeedbackDesc: "Showcase reviews, tags, and verification for instant trust.",
    trafficIdeasLocal: "Local focus",
    trafficIdeasLocalDesc: "Use city and category chips to target nearby buyers.",
    growthStepPost: "Post today",
    growthStepPostDesc: "Launch with verified contact, city tag, and price window.",
    growthStepShare: "Share fast",
    growthStepRespond: "Respond anywhere",
    growthStepRespondDesc: "Compact cards and quick actions stay thumb-friendly on mobile.",
    phoneVerified: "Phone verified",
    mkRibbonTitle: "Made for North Macedonia",
    mkRibbonSubtitle: "Local-first layout, Macedonian-friendly language, and city shortcuts you know.",
    cityShortcuts: "Popular cities",
    categorySpotlight: "Popular categories",
    neighborhoodFriendly: "Neighbourhood-friendly navigation",
    exploreHeroTitle: "Explore trusted local listings",
    exploreHeroSubtitle: "Use quick filters to keep cards tidy and open details when you're ready.",
    city: "city",
    cities: "cities",
    todaySpotlight: "Today's spotlight board",
    spotlightHint: "A tight carousel of trusted listings that stays visible without endless scrolling.",
    homeDigest: "Live snapshot",
    // Form / Listings
    submitListing: "Submit Your Listing",
    browse: "Browse Listings",
    name: "Business or Service Name",
    category: "Category",
    location: "Location",
    description: "Description",
    contact: "Contact Phone",
    selectCategory: "Select category",
    verified: "Verified",
    selectCity: "Select city",
    // Legal & Account
    legal: "Legal",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    readTerms: "Read our terms",
    readPrivacy: "Read our privacy policy",
    reportListing: "Report Listing",
    reportReason: "Reason for reporting",
    spam: "Spam",
    inappropriate: "Inappropriate Content",
    other: "Other",
    sendReport: "Submit Report",
    reportSuccess: "Listing reported. Thank you.",
    deleteAccount: "Delete Account",
    dangerZoneDesc: "Irreversible account actions",
    deleteAccountWarning: "Once you delete your account, there is no going back. Please be certain.",
    deleteAccountConfirm: "Are you sure you want to delete your account? This action cannot be undone and will remove all your listings.",
    editProfile: "Edit Profile",
    updateProfile: "Update Profile",
    displayName: "Display Name",
    profileUpdated: "Profile updated successfully",
    accountDeleted: "Your account has been deleted",
    dangerZone: "Danger Zone",
    report: "Report",
    locationExtra: "Town / village / neighborhood (optional)",
    chooseOnMap: "Choose on map",
    locationSetTo: "Location set to",
    // Filters / Search
    search: "Search",
    searchPlaceholder: "Search by name or description...",
    filterByCategory: "Filter by category",
    allCategories: "All categories",
    filterByLocation: "Filter by location",
    allLocations: "All locations",
    sortBy: "Sort by",
    sortTopRated: "Highest rated",
    sortNewest: "Newest",
    sortExpiring: "Expiring soon",
    sortAZ: "A → Z",
    resultsSummary: "Sorted by rating with trimmed descriptions for easy scanning.",
    refineResults: "Refine results",
    filterHelper: "Narrow down by name, city, category, or sort preference.",
    resetFilters: "Reset filters",
    quickFilters: "Quick filters",
    showFilters: "Show filters",
    hideFilters: "Hide filters",
    menu: "Menu",
    filters: "Filters",
    filterSubtitle: "Refine your search",
    favoritesOnly: "Favorites only",
    language: "Language",
    activeFilters: "Active filters",
    closeFilters: "Close filters",
    clearAll: "Clear all",
    clearSearch: "Clear search",
    clearFilters: "Clear all filters",
    switchToListView: "Switch to list view",
    switchToGridView: "Switch to grid view",
    noListingsFound: "No listings found",
    tryDifferentFilters: "Try adjusting your search or filters to find more listings.",
    noListingsAvailable: "There are currently no listings available.",
    listing: "listing",
    listingsLabel: "listings",
    resultsLabel: "Results",
    resultsPerPage: "Per page",
    previousPage: "Previous page",
    nextPage: "Next page",
    // Authentication
    login: "Login",
    signup: "Sign Up",
    sendVerifyLink: "Send Verification Link",
    email: "Email Address",
    password: "Password",
    phoneNumber: "Phone Number",
    confirmPassword: "Confirm Password",
    loginWithEmail: "Login with Email Link",
    sendLink: "Send Login Link",
    enterCode: "Enter verification code",
    verifyPhone: "Verify Phone Number",
    codeSent: "Code sent successfully!",
    loginSuccess: "Login successful!",
    signupSuccess: "Account created successfully!",
    invalidCredentials: "Invalid email or password.",
    passwordMismatch: "Passwords do not match.",
    enterValidEmail: "Please enter a valid email.",
    enterValidPhone: "Please enter a valid phone number.",
    resendCode: "Resend Code",
    authOptional: "Authentication (Optional)",
    signedIn: "Signed in",
    signedUp: "Signed up",
    signedOut: "Signed out",
    emailLinkSent: "Email link sent",
    loginRequired: "Please log in to post a listing.",
    verifyEmailFirst: "Please verify your email before posting.",
    enterEmail: "Please provide your email for confirmation",
    addPhoneInAccount: "Please add your phone number in your account first.",
    contactAutofill: "We use your account phone for trust and safety.",
    favorites: "Favorites",
    goToAccount: "Go to account",
    phoneSynced: "Using your account phone number.",
    contactEditLocked: "Phone number can't be changed here. Update it in Account settings.",
    plan: "Plan",
    postingReady: "Posting ready",
    postingReadyHint: "Listings reuse your saved phone number and location for faster posting.",
    useAccountPhone: "Use account phone",
    signInWithPhone: "Phone Number",
    loginSubtitle: "Access your BizCall account to explore and manage listings.",
    signupSubtitle: "Create your BizCall account to post and contact local businesses.",
    createAccount: "Create account",
    // PayPal / Payments (Removed)
    // Dashboard / Data
    dashboard: "Dashboard",
    profile: "Profile",
    updateProfile: "Update Profile",
    transactions: "Transactions",
    transactionHistory: "Transaction History",
    noTransactions: "No transactions yet.",
    viewDetails: "View Details",
    amount: "Amount",
    date: "Date",
    status: "Status",
    success: "Success",
    failed: "Failed",
    pending: "Pending",
    pendingVerification: "Pending Verification",
    pendingPayment: "Pending Payment",
    // Errors / Messages
    errorOccured: "An error occurred. Please try again later.",
    fillAllFields: "Please fill in all required fields.",
    invalidCode: "Invalid verification code.",
    networkError: "Network error. Check your connection.",
    error: "Error:",
    // Listing actions
    edit: "Edit",
    del: "Delete",
    call: "Call",
    emailAction: "Email",
    copy: "Copy",
    copied: "Copied to clipboard",
    listedOn: "Listed on",
    quickFacts: "Quick facts",
    pricing: "Pricing",
    contactEmail: "Contact email",
    reputation: "Reputation",
    communityFeedback: "Community feedback",
    ratingLabel: "Your rating",
    commentPlaceholderDetailed: "Share your experience, notes, or questions for the owner.",
    saveFeedback: "Save feedback",
    feedbackSaved: "Feedback saved",
    feedbackSaveError: "Could not save feedback right now.",
    noFeedback: "No feedback yet",
    recentFeedback: "Recent feedback",
    cloudFeedbackNote: "Ratings and comments are stored securely so everyone can see them.",
    averageRating: "Average rating",
    reviews: "reviews",
    shareListing: "Share listing",
    shareHint: "Share your listing with neighbours to collect feedback and boost visibility.",
    updateListing: "Refresh one listing",
    statusLabel: "Status",
    locationLabelFull: "Location",
    feedbackSidebarBlurb: "Ratings and notes help everyone see the most trusted listings.",
    expires: "Expires",
    months: "month/s",
    allListingsHint: "View and filter all verified listings on the platform.",
    expiringSoon: "Expiring soon",
    expired: "Expired",
    day: "day",
    days: "days",
    remaining: "left",
    noExpiry: "No expiration",
    view: "View",
    allStatuses: "All statuses",
    allExpiry: "All",
    active: "Active",
    sortOldest: "Oldest first",
    noListingsMatchFilters: "No listings match your filters. Try adjusting your search.",
    food: "Food & Drinks",
    car: "Car Services",
    electronics: "Electronics",
    homeRepair: "Home Repair",
    health: "Health & Beauty",
    education: "Education",
    clothing: "Clothing & Accessories",
    pets: "Pets",
    services: "Professional Services",
    tech: "IT & Software",
    entertainment: "Entertainment",
    events: "Events & Venues",
    other: "Other",
    enterPhone: "Please enter your phone number",
    enterName: "Please enter your name",
    loginToPost: "Please log in to post a listing",
    mustLoginToCreate: "You must be logged in to create a listing",
    stepBasic: "Basic",
    stepDetails: "Details",
    stepPlanPreview: "Plan & Preview",
    offerPriceLabel: "Offer price range (optional)",
    minPrice: "Min",
    maxPrice: "Max",
    tagsPlaceholder: "Tags, comma-separated (optional)",
    socialPlaceholder: "Social / Website (optional)",
    previewTitlePlaceholder: "Your Business Name",
    previewDescriptionPlaceholder: "A short description appears here...",
    priceRangePlaceholder: "Price range (e.g. 500 - 800 MKD)",
    tagsShortPlaceholder: "Tags (optional)",
    socialShortPlaceholder: "Social / Website",
    uploadCoverLocal: "Upload cover (local)",
    emailLabel: "Email",
    verifiedLabel: "Verified",
    yes: "Yes",
    no: "No",
    resendVerificationEmail: "Resend verification email",
    verificationSent: "Verification email sent — check your inbox.",
    verificationError: "Error sending verification:",
    emailLoginSignup: "Email login / signup",
    emailTab: "Email",
    priceLabel: "Price",
    tagsLabel: "Tags",
    websiteLabel: "Website",
    cityLabel: "City",
    areaLabel: "Area",
    manageListings: "Manage Listings",
    accountSince: "Account created",
    accountTitle: "Account",
    accountSubtitle: "Manage your login status, verification and security settings.",
    securitySettings: "Security & login",
    securitySettingsText: "Update your email and password to keep your account safe.",
    changeEmail: "Change email",
    newEmail: "New email",
    newEmailPlaceholder: "Enter new email",
    currentPassword: "Current password",
    currentPasswordPlaceholder: "Enter current password",
    saveEmail: "Save email",
    changePassword: "Change password",
    newPassword: "New password",
    newPasswordPlaceholder: "Enter new password",
    repeatNewPassword: "Repeat new password",
    repeatNewPasswordPlaceholder: "Repeat new password",
    savePassword: "Save password",
    saving: "Saving...",
    favorite: "Favorite",
    emailChangeNotAvailable: "Email change is not available for this account.",
    emailUpdateSuccess: "Email updated successfully.",
    emailUpdateError: "Could not update email.",
    passwordTooShort: "Password must be at least 6 characters.",
    passwordsDontMatch: "New passwords do not match.",
    passwordChangeNotAvailable: "Password change is not available for this account.",
    passwordUpdateSuccess: "Password updated successfully.",
    passwordUpdateError: "Could not update password.",
    enterCurrentPassword: "Please enter your current password.",
    myListingsHint: "Manage, edit and extend your listings.",
    priceRangeLabel: "Price range",
    tagsFieldLabel: "Tags",
    websiteFieldLabel: "Website / Social link",
    websitePlaceholder: "Paste a link (optional)",
    coverImage: "Cover image",
    // NEW: Sharing & trust
    share: "Share",
    shareText: "Shared from Local Support Market",
    shareCopied: "Listing link copied to clipboard ✅",
    shareNotSupported: "This device does not support sharing.",
    whyTrustUs: "Why Local Support Market?",
    trustPoint1: "All listings are manually reviewed before they are verified.",
    trustPoint2: "Direct contact with businesses, with no hidden commissions or fees.",
    trustPoint3: "Built for cities across North Macedonia, with a focus on local businesses.",
    trustPoint4: "Option to report suspicious or abusive listings.",
    verifyYourEmail: "Verify your email",
    verifyEmailHint: "We sent a verification link to your inbox. You can keep browsing, but you can’t submit listings until you verify.",
    resendEmail: "Resend email",
    verifyLater: "Verify later",
    verifying: "Checking…",
    emailVerified: "Email verified!",
    notVerifiedYet: "Still not verified. Check your inbox (and spam) and try again.",
    verifyFootnote: "Tip: it can take a minute. If you used a wrong email, log out and sign up again.",
    iVerified: "I verified",
    phoneLoginSubtitle: "Log in quickly with an SMS code on your phone.",
    unspecified: "Unspecified",
    map: "Map",
    openInMaps: "Open in Maps",
    postedOn: "Posted on",
    locationDetails: "Location details",
    aboutListing: "About this listing",
    quickActions: "Quick actions",
    // Home section - simplified
    homeSimpleTitle: "Find a handyman, seller or service in your city",
    homeSimpleSubtitle: "Post a small ad with your phone number and city, or quickly search what others offer.",
    homeSimpleCtaPost: "Post an ad",
    homeSimpleCtaBrowse: "Browse ads",
    homeSimpleTrustLine: "No commissions, you talk directly by phone or Viber.",
    homePopularCategoriesTitle: "Most used categories",
    homePopularCitiesTitle: "Popular cities",
    homeHowItWorksTitle: "How it works",
    homeHowItWorksStep1: "Post an ad with your phone, city and short description.",
    homeHowItWorksStep2: "People call you or write on Viber / WhatsApp.",
    homeHowItWorksStep3: "They leave ratings so others know who is trusted.",
    // New keys added
    commentEmptyError: "Comment cannot be empty",
    trustSafetyLane: "Trust & Safety lane",
    trustSafetyLaneDesc: "Keep conversations secure with verified contacts, transparent pricing, and a consistent city tag.",
    localMissions: "Local missions",
    localMissionsDesc: "Rotate through weekly prompts to keep your profile fresh and boost visibility in the spotlight rail.",
    spotlightHintHero: "Track momentum, stay verified, and guide neighbours toward your best offers without digging through menus.",
    submitListingDesc: "Post, verify contact info, and publish in minutes.",
    exploreHint: "Search by category, price, and location for quick matches.",
    verifiedHint: "Keep trust high with verified profiles and plans.",
    browseMarketplace: "Browse the marketplace",
    postService: "Post a service",
    updateListingHint: "Add a new tag or price range to appear in curated lanes.",
    shareLinkHint: "Send your listing link to neighbours and collect feedback.",
    pickCityChip: "Pick a city chip to get discovered faster.",
    getStartedFast: "Get started fast",
    preview: "Preview",
    bizCall: "BizCall",
    emailSameAsCurrent: "Please enter a different email address",
    verifyCurrentEmailFirst: "Please verify your current email address before changing it.",
    emailUpdateSuccessVerify: "Email updated successfully! Please check your new email for verification.",
    passwordIncorrect: "Incorrect password. Please try again.",
    browseListings: "Browse Listings",
    createListing: "Create Listing",
    reviewRestrictedSignin: "⚠️ Reviewing is restricted. You must be signed in to leave feedback.",
    reviewRestrictedVerified: "⚠️ Only verified users who haven't reviewed this listing yet can leave feedback.",
    communityTagline: "Trusted local services",
    browseListingsHint: "Browse all listings",
    createListingHint: "Create a new listing",
    manageListingsHint: "Manage everything in one place",
    reviewsLabel: "Reviews",
    memberSince: "Member since",
    profileInfo: "Profile Information",
    accountDetails: "Your account details",
    updateEmailDesc: "Update your email address",
    addPhoneNumber: "Add phone number",
    subscriptionUpdated: "Subscription updated successfully!",
    errorUpdatingSubscription: "Error updating subscription",
    emailSubscription: "Email Subscription",
    subscribeToWeeklyEmails: "Subscribe to weekly emails",
    phoneUpdated: "Phone number updated successfully!",
    errorUpdatingPhone: "Error updating phone number:",
    passwordRequired: "Password is required for this action.",
    changePhone: "Change phone number",
    newPhone: "New phone number",
    savePhone: "Save phone",
    expiry: "Expiry",
    resultsLabel: "results",
    removeFilter: "Remove filter",
    listingDeleted: "Listing deleted",
    notSignedIn: "Not signed in.",
    saveSuccess: "Saved successfully!",
    sendingCode: "Sending code...",
    verifying: "Verifying...",
    verifyCode: "Verify Code",
    phoneAlreadyInUse: "This phone number is already in use by another account.",
    phoneAlreadyInUseTitle: "Phone number already in use",
    invalidPhone: "Invalid phone number.",
    errorOccurred: "An error occurred.",
    copiedToClipboard: "Copied to clipboard!",
    shareVia: "Share via",
    loginToSeeMore: "Login to see more",
    noAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    forgotPassword: "Forgot password?",
    resetPassword: "Reset password",
    emailRequired: "Email is required.",
    phoneRequired: "Phone number is required.",
    passwordRequired: "Password is required.",
    invalidEmail: "Invalid email address.",
    unauthorized: "Unauthorized access.",
    forbidden: "Forbidden access.",
    sessionExpired: "Session expired. Please login again.",
    loadingMore: "Loading more...",
    noMoreData: "No more data to load.",
    searchNoResults: "No results found for your search.",
    somethingWentWrong: "Something went wrong. Please try again.",
    tryAgain: "Try again",
    goBack: "Go back",
    pageNotFound: "Page not found.",
    home: "Home",
    dashboard: "Dashboard",
    settings: "Settings",
    profile: "Profile",
    security: "Security",
    notifications: "Notifications",
    help: "Help",
    faq: "FAQ",
    contactUs: "Contact Us",
    termsOfService: "Terms of Service",
    reviewNotificationSubject: "New review for your listing",
    reviewNotificationText: "Hi, someone just left a review for your listing.",
    reviewNotificationComment: "Comment",
    reviewNotificationCheck: "Check it out here",
    seoTitle: "BizCall - Local Services",
    seoDescription: "Find and share trusted local services across North Macedonia",
    seoKeywords: "local services, marketplace, North Macedonia, Skopje, Tetovo",
    page: "Page",
    of: "of",
    exploreSubtitle: "Find and share trusted local services across North Macedonia",
    allCities: "All cities",
    privacyPolicy: "Privacy Policy",
    cookiesPolicy: "Cookies Policy",
    allRightsReserved: "All rights reserved.",
    madeWithLove: "Made with love in North Macedonia",
    version: "Version",
    build: "Build",
    // Added/Refined keys
    differentEmailRequired: "Please enter a different email address",
    verifyCurrentEmailBeforeChange: "Please verify your current email address before changing it.",
    addPhoneInAccountSettings: "Add your phone in account settings first.",
    createListing: "Create listing",
    browseListings: "Browse listings",
    emailChangeRestricted: "⚠️ Email change is restricted by Firebase. Your new email has been saved in your profile, but you'll need to sign out and sign in with your new email address. Alternatively, contact support to enable email changes in Firebase Console.",
    reviewRestrictedSignin: "⚠️ Review restricted. You must be signed in to leave feedback.",
    reviewRestrictedVerified: "⚠️ Only verified users who haven't reviewed this listing yet can leave feedback.",
    emailChangeFailed: "Email change failed. Firebase has restricted email changes. Please contact support or check Firebase Console > Authentication > Settings.",
    emailInUse: "This email is already in use by another account.",
    recentLoginRequired: "Please log out and log back in before changing your email.",
    emailEnumProtection: "Email changes are blocked by 'Email Enumeration Protection' in Firebase. To fix: Install Google Cloud SDK, then run: gcloud identity-platform settings update --project=YOUR_PROJECT_ID --disable-email-enum. Or check Firebase Console > Authentication > Settings for email enumeration protection settings.",
    previousPage: "Previous page",
    nextPage: "Next page",
    callAction: "Call",
    share: "Share",
    day: "day",
    days: "days",
    all: "All",
    allCategories: "All Categories",
    allLocations: "All Locations",
    any: "Any",
    confirmDelete: "Are you sure you want to delete this listing?",
    emailAction: "Email",
    shareAction: "Share",
    websiteLabel: "Website",
    unspecified: "Unspecified",
    notOwner: "You are not the owner of this listing.",
    verifyEmailFirst: "Please verify your email first.",
    saveSuccess: "Changes saved successfully!",
    // Legal Modals
    termsLastUpdated: "Last Updated:",
    termsIntro: "Welcome to BizCall (Local Support Market). By using our app, you agree to these terms.",
    terms1Title: "1. Acceptance of Terms",
    terms1Text: "By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.",
    terms2Title: "2. User Conduct",
    terms2Text: "You agree to use the service only for lawful purposes. You are responsible for all content you post.",
    terms2List1: "No spam or misleading content.",
    terms2List2: "No illegal goods or services.",
    terms2List3: "No harassment or hate speech.",
    terms3Title: "3. Listing Rules",
    terms3Text: "We reserve the right to remove any listing that violates our policies without refund.",
    terms4Title: "4. Liability",
    terms4Text: "BizCall is a platform connecting users. We are not responsible for the quality of services provided by users.",
    terms5Title: "5. Termination",
    terms5Text: "We may terminate your access to the site, without cause or notice.",
    privacyLastUpdated: "Last Updated:",
    privacyIntro: "Your privacy is important to us. This policy explains how we handle your data.",
    privacy1Title: "1. Information We Collect",
    privacy1Text: "We collect information you provide directly to us, such as your email address, phone number, and listing details.",
    privacy2Title: "2. How We Use Information",
    privacy2Text: "We use your information to operate and improve our services and communicate with you.",
    privacy3Title: "3. Data Sharing",
    privacy3Text: "We do not sell your personal data. We may share data with service providers (e.g., Firebase) to operate the app.",
    privacy4Title: "4. Your Rights",
    privacy4Text: "You have the right to access, update, or delete your personal information at any time via your account settings.",
    privacy5Title: "5. Contact",
    privacy5Text: "If you have questions about this policy, please contact us."
  },
  sq: {
    // Cookie Consent
    verified: "I verifikuar",
    pending: "Në pritje",
    closeFilters: "Mbyll filtrat",
    filterSubtitle: "Rafino kërkimin tënd",
    clearSearch: "Pastro kërkimin",
    status: "Statusi",
    allStatuses: "Të gjitha statuset",
    allExpiry: "Të gjitha",
    active: "Aktiv",
    sortTopRated: "Më të vlerësuarat",
    sortNewest: "Më të rejat",
    sortExpiring: "Skadon së shpejti",
    sortAZ: "A → Z",
    contactEditLocked: "Numri i telefonit nuk mund të ndryshohet këtu. Përditësojeni në cilësimet e llogarisë.",
    goToAccount: "Shko te llogaria",
    priceRangeLabel: "Gama e çmimit",
    tagsFieldLabel: "Etiketat",
    tagsPlaceholder: "Etiketa, të ndara me presje (opsionale)",
    websiteFieldLabel: "Website / Link social",
    websitePlaceholder: "Ngjitni një link (opsionale)",
    communityTagline: "Shërbime lokale të besuara",
    reviewsLabel: "Vlerësime",
    cookieConsentText: "Ne përdorim cookies për të siguruar që të merrni përvojën më të mirë në faqen tonë të internetit.",
    accept: "Prano",
    // General
    ",": ",",
    noMyListings: "Nuk keni asnjë listim ende",
    myListingsSubtitle: "Menaxhoni listimet tuaja aktive dhe të skaduara",
    exploreSubtitle: "Shfletoni të gjitha listimet e verifikuara në zonën tuaj",
    saveChanges: "Ruaj Ndryshimet",
    reauthRequired: "Ju lutemi dilni dhe hyni përsëri për të fshirë llogarinë tuaj.",
    images: "Imazhe",
    uploadImages: "Ngarko Imazhe",
    title: "Tregu Lokal i Ndihmës",
    appName: "Tregu Lokal i Ndihmës",
    bizcallLogo: "Logo BizCall",
    previewAlt: "parapamje",
    close: "Mbyll",
    welcome: "Mirë se erdhët!",
    hello: "Përshëndetje",
    logout: "Dil",
    loading: "Duke u ngarkuar...",
    cancel: "Anulo",
    save: "Ruaj",
    continue: "Vazhdo",
    back: "Kthehu",
    noListingsYet: "Ende nuk ka listime",
    signedOutAs: "Dil",
    categories: "Kategori",
    responsiveLayout: "Pamje responsive",
    // Plans
    month1: "1 Muaj",
    month3: "3 Muaj",
    month6: "6 Muaj",
    month12: "12 Muaj",
    days30: "30 ditë",
    days90: "90 ditë",
    days180: "180 ditë",
    days365: "365 ditë",
    selectPlan: "Zgjidhni Planin",
    planBasic: "Bazë",
    planStandard: "Standard",
    planPro: "Pro",
    planPremium: "Premium",
    category: "Kategoria",
    location: "Vendndodhja",
    contact: "Telefoni i Kontaktit",
    login: "Hyr",
    email: "Adresa e Email-it",
    password: "Fjalëkalimi",
    food: "Ushqim",
    car: "Makinë",
    electronics: "Elektronikë",
    homeRepair: "Riparime shtëpie",
    health: "Shëndet",
    education: "Edukim",
    clothing: "Veshje",
    pets: "Kafshë shtëpiake",
    services: "Shërbime",
    tech: "Teknologji",
    entertainment: "Argëtim",
    events: "Ngjarje",
    other: "Të tjera",
    // Header / Navigation
    openDashboard: "Hap Panelin",
    closeDashboard: "Mbyll Panelin",
    myListings: "Listimet e mia",
    account: "Llogaria",
    explore: "Eksploro",
    homepage: "Kreu",
    community: "Marketplace i komunitetit",
    primaryNav: "Navigimi kryesor",
    // Hero / Landing
    heroTitle: "Gjej dhe shpërndaj shërbime të besueshme në gjithë Maqedoninë",
    heroSubtitle: "Nga Shkupi në Ohër, gjej vendas që të ndihmojnë sot ose prezanto aftësitë e tua.",
    quickStart: "Nis shpejt",
    heroPanelTitle: "Posto me besim",
    heroPanelSubtitle: "Shto detajet, zgjidh planin dhe lejo fqinjët të të kontaktojnë me të dhënat e verifikuara.",
    heroPointOne: "Zgjidh kategorinë, qytetin dhe një përshkrim të shkurtër.",
    heroPointTwo: "Verifiko emailin ose telefonin për më shumë besim.",
    heroPointThree: "Thekso ofertën dhe kohëzgjatjen për të mbetur i dukshëm.",
    homepageReboot: "Qendër e re responsive",
    ctaWatchDemo: "Shiko turin",
    mobileFirstTitle: "Responsive që në fillim",
    mobileFirstSubtitle: "Pamjet përshtaten bukur në telefona, tableta dhe desktop.",
    growthBoardTitle: "Plani i rritjes",
    growthBoardSubtitle: "Gjej më shpejt",
    growthBoardHelper: "Tre hapa që e mbajnë listimin të dukshëm dhe mbi pjesën kryesore.",
    trafficIdeasTitle: "Ide trafiku",
    trafficIdeasSubtitle: "Mbaj sytë mbi listimin",
    trafficIdeasTrending: "Karusel trendi",
    trafficIdeasFeedback: "Mblidh reagime",
    trafficIdeasFeedbackDesc: "Shfaq vlerësime, etiketa dhe verifikim për besim të menjëhershëm.",
    trafficIdeasLocal: "Fokus lokal",
    trafficIdeasLocalDesc: "Përdor qytetet dhe kategoritë për të synuar blerësit pranë teje.",
    growthStepPost: "Posto sot",
    subscriptionUpdated: "Abonimi u përditësua me sukses!",
    errorUpdatingSubscription: "Gabim gjatë përditësimit të abonimit",
    emailSubscription: "Abonimi me email",
    subscribeToWeeklyEmails: "Abonohu në email-et javore",
    phoneUpdated: "Numri i telefonit u përditësua me sukses!",
    errorUpdatingPhone: "Gabim gjatë përditësimit të numrit të telefonit:",
    phoneVerified: "Telefoni u verifikua",
    passwordRequired: "Fjalëkalimi kërkohet për këtë veprim.",
    changePhone: "Ndrysho numrin e telefonit",
    newPhone: "Numri i ri i telefonit",
    savePhone: "Ruaj telefonin",
    expiry: "Skadimi",
    resultsLabel: "rezultate",
    removeFilter: "Hiq filtrin",
    aboutListing: "Rreth këtij listimi",
    accountDetails: "Detajet e llogarisë tuaj",
    accountSince: "Anëtar që nga",
    accountSubtitle: "Menaxhoni statusin tuaj, verifikimin dhe sigurinë.",
    activeFilters: "Filtrat aktivë",
    addPhoneInAccount: "Ju lutemi shtoni numrin e telefonit në llogarinë tuaj.",
    addPhoneNumber: "Shto numrin e telefonit",
    averageRating: "Vlerësimi mesatar",
    bizCall: "BizCall",
    browseListingsHint: "Shfletoni të gjitha listimet",
    browseMarketplace: "Shfletoni tregun",
    call: "Telefono",
    categorySpotlight: "Kategoritë e njohura",
    changeEmail: "Ndrysho email-in",
    changePassword: "Ndrysho fjalëkalimin",
    chooseOnMap: "Zgjidh në hartë",
    cities: "qytetet",
    clearAll: "Pastro të gjitha",
    clearFilters: "Pastro filtrat",
    cloudFeedbackNote: "Vlerësimet ruhen në mënyrë të sigurt.",
    codeSent: "Kodi u dërgua me sukses!",
    commentEmptyError: "Komenti nuk mund të jetë bosh",
    commentPlaceholderDetailed: "Ndani përvojën tuaj ose bëni pyetje.",
    communityFeedback: "Feedback-u i komunitetit",
    contactAutofill: "Ne përdorim telefonin e llogarisë tuaj për siguri.",
    contactEmail: "Email-i i kontaktit",
    copied: "U kopjua në clipboard",
    copy: "Kopjo",
    createAccount: "Krijo llogari",
    createListingHint: "Krijo një listim të ri",
    currentPassword: "Fjalëkalimi aktual",
    currentPasswordPlaceholder: "Shkruani fjalëkalimin aktual",
    dashboard: "Paneli",
    day: "ditë",
    days: "ditë",
    del: "Fshij",
    description: "Përshkrimi",
    edit: "Ndrysho",
    emailAction: "Email",
    emailChangeNotAvailable: "Ndryshimi i email-it nuk është i disponueshëm.",
    emailLabel: "Email",
    emailLinkSent: "Linku i email-it u dërgua",
    emailLoginSignup: "Hyrje / Regjistrim me Email",
    emailTab: "Email",
    emailUpdateError: "Nuk u mundësua përditësimi i email-it.",
    emailUpdateSuccess: "Email-i u përditësua me sukses.",
    emailVerified: "Email-i u verifikua!",
    enterCode: "Shkruani kodin e verifikimit",
    enterCurrentPassword: "Ju lutemi shkruani fjalëkalimin aktual.",
    enterEmail: "Ju lutemi jepni email-in tuaj",
    enterValidEmail: "Ju lutemi shkruani një email të vlefshëm.",
    enterValidPhone: "Ju lutemi shkruani një numër telefoni të vlefshëm.",
    error: "Gabim:",
    errorUpdatingPhone: "Gabim gjatë përditësimit të telefonit:",
    eur: "EUR",
    expired: "Ka skaduar",
    expires: "Skadon",
    expiringSoon: "Skadon së shpejti",
    exploreHint: "Kërko sipas kategorisë, çmimit dhe vendndodhjes.",
    favorite: "I preferuar",
    favorites: "Të preferuarat",
    feedbackSaved: "Feedback-u u ruajt",
    feedbackSaveError: "Nuk u mundësua ruajtja e feedback-ut.",
    feedbackSidebarBlurb: "Vlerësimet ndihmojnë të gjithë të shohin listimet më të besuara.",
    fillAllFields: "Ju lutemi plotësoni të gjitha fushat e kërkuara.",
    filters: "Filtrat",
    getStartedFast: "Fillo shpejt",
    goToAccount: "Shko te llogaria",
    hideFilters: "Fshih filtrat",
    homeDigest: "Pasqyra live",
    homeHowItWorksTitle: "Si funksionon",
    homeHowItWorksStep1: "Postoni një njoftim me telefonin tuaj, qytetin dhe një përshkrim të shkurtër.",
    homeHowItWorksStep2: "Njerëzit ju telefonojnë ose ju shkruajnë në Viber / WhatsApp.",
    homeHowItWorksStep3: "Ata lënë vlerësime që të tjerët të dinë kush është i besuar.",
    homePopularCategoriesTitle: "Kategoritë më të përdorura",
    homePopularCitiesTitle: "Qytetet e njohura",
    homeSimpleCtaBrowse: "Shfleto njoftimet",
    homeSimpleCtaPost: "Posto një njoftim",
    homeSimpleSubtitle: "Postoni një njoftim të vogël me telefonin dhe qytetin tuaj.",
    homeSimpleTitle: "Gjeni një mjeshtër, shitës ose shërbim në qytetin tuaj",
    homeSimpleTrustLine: "Pa komisione, flisni drejtpërdrejt me telefon ose Viber.",
    invalidCode: "Kodi i verifikimit është i pavlefshëm.",
    iVerified: "Unë e verifikova",
    listedOn: "Listuar më",
    listing: "listim",
    listingsLabel: "listime",
    localMissions: "Misionet lokale",
    localMissionsDesc: "Përditësoni profilin tuaj për të rritur dukshmërinë.",
    locationDetails: "Detajet e vendndodhjes",
    locationExtra: "Qyteti / fshati / lagjia (opsionale)",
    locationLabelFull: "Vendndodhja",
    locationSetTo: "Vendndodhja u caktua në",
    loginRequired: "Ju lutemi hyni për të postuar një listim.",
    loginSubtitle: "Hyni në llogarinë tuaj BizCall.",
    manageListings: "Menaxho Listimet",
    maxPrice: "Maks",
    memberSince: "Anëtar që nga",
    menu: "Menu",
    minPrice: "Min",
    myListingsHint: "Menaxhoni, ndryshoni dhe zgjatni listimet tuaja.",
    name: "Emri i Biznesit ose Shërbimit",
    newEmail: "Email i ri",
    newEmailPlaceholder: "Shkruani email-in e ri",
    newPassword: "Fjalëkalimi i ri",
    newPasswordPlaceholder: "Shkruani fjalëkalimin i ri",
    noExpiry: "Pa skadim",
    noFeedback: "Ende nuk ka feedback",
    noListingsAvailable: "Aktualisht nuk ka listime të disponueshme.",
    noListingsFound: "Nuk u gjet asnjë listim",
    noListingsMatchFilters: "Asnjë listim nuk përputhet me filtrat tuaj.",
    notOwner: "Ju mund të zgjatni vetëm listimin tuaj.",
    notVerifiedYet: "Ende i paverifikuar. Kontrolloni email-in tuaj.",
    offerPriceLabel: "Gama e çmimit të ofertës (opsionale)",
    openInMaps: "Hap në Hartë",
    passwordChangeNotAvailable: "Ndryshimi i fjalëkalimit nuk është i disponueshëm.",
    passwordsDontMatch: "Fjalëkalimet e reja nuk përputhen.",
    passwordTooShort: "Fjalëkalimi duhet të jetë të paktën 6 karaktere.",
    passwordUpdateError: "Nuk u mundësua përditësimi i fjalëkalimit.",
    passwordUpdateSuccess: "Fjalëkalimi u përditësua me sukses.",
    pending: "Në pritje",
    pendingVerification: "Duke u verifikuar",
    phoneLoginSubtitle: "Hyni shpejt me një kod SMS në telefonin tuaj.",
    phoneNumber: "Numri i Telefonit",
    phoneSynced: "Duke përdorur numrin e telefonit të llogarisë tuaj.",
    pickCityChip: "Zgjidhni një qytet për t'u zbuluar më shpejt.",
    postedOn: "Postuar më",
    postingReadyHint: "Listimet përdorin telefonin dhe vendndodhjen tuaj të ruajtur.",
    postService: "Posto një shërbim",
    previewDescriptionPlaceholder: "Një përshkrim i shkurtër shfaqet këtu...",
    previewTitlePlaceholder: "Emri i Biznesit Tuaj",
    priceLabel: "Çmimi",
    priceRangeLabel: "Gama e çmimit",
    pricing: "Çmimet",
    profileInfo: "Informacioni i Profilit",
    quickActions: "Veprime të shpejta",
    quickFacts: "Fakte të shpejta",
    ratingLabel: "Vlerësimi juaj",
    recentFeedback: "Feedback-u i fundit",
    remaining: "mbetur",
    repeatNewPassword: "Përsërit fjalëkalimin e ri",
    repeatNewPasswordPlaceholder: "Përsërit fjalëkalimin e ri",
    reputation: "Reputacioni",
    resendEmail: "Ridërgo email-in",
    resendVerificationEmail: "Ridërgo email-in e verifikimit",
    resultsPerPage: "Për faqe",
    reviews: "vlerësime",
    saveEmail: "Ruaj email-in",
    saveFeedback: "Ruaj feedback-un",
    savePassword: "Ruaj fjalëkalimin",
    saving: "Duke u ruajtur...",
    search: "Kërko",
    securitySettings: "Siguria dhe hyrja",
    securitySettingsText: "Përditësoni email-in dhe fjalëkalimin tuaj.",
    selectCategory: "Zgjidh kategorinë",
    selectCity: "Zgjidh qytetin",
    sendLink: "Dërgo Linkun e Hyrjes",
    sendVerifyLink: "Dërgo Linkun e Verifikimit",
    share: "Shpërndaj",
    shareCopied: "Linku i listimit u kopjua ✅",
    shareLinkHint: "Dërgoni linkun e listimit fqinjëve tuaj.",
    shareListing: "Shpërndaj listimin",
    shareNotSupported: "Kjo pajisje nuk mbështet shpërndarjen.",
    shareText: "Shpërndarë nga Local Support Market",
    showFilters: "Shfaq filtrat",
    signedIn: "I hyrë",
    signedOut: "I dalë",
    signInWithPhone: "Numri i Telefonit",
    signup: "Regjistrohu",
    signupSubtitle: "Krijoni llogarinë tuaj BizCall.",
    signupSuccess: "Llogaria u krijua me sukses!",
    socialPlaceholder: "Social / Web (opsionale)",
    sortAZ: "A → Zh",
    sortExpiring: "Skadon së shpejti",
    sortNewest: "Më të rejat",
    sortTopRated: "Më të vlerësuarat",
    spotlightHintHero: "Ndiqni progresin dhe qëndroni të verifikuar.",
    status: "Statusi",
    statusLabel: "Statusi",
    stepBasic: "Bazë",
    stepDetails: "Detajet",
    stepPlanPreview: "Plani & Shikimi paraprak",
    submitListing: "Dërgo Listimin Tënd",
    submitListingDesc: "Posto, verifiko dhe publiko në pak minuta.",
    switchToGridView: "Kalo në pamjen rrjetë",
    switchToListView: "Kalo në pamjen listë",
    tagsPlaceholder: "Etiketa, të ndara me presje (opsionale)",
    trustPoint1: "Të gjitha listimet rishikohen manualisht.",
    trustPoint2: "Kontakt i drejtpërdrejtë me bizneset, pa komisione.",
    trustPoint3: "Ndërtuar për qytetet në të gjithë Maqedoninë e Veriut.",
    trustPoint4: "Mundësia për të raportuar listime të dyshimta.",
    trustSafetyLane: "Korsia e Besimit dhe Sigurisë",
    trustSafetyLaneDesc: "Mbani bisedat të sigurta me kontakte të verifikuara.",
    tryDifferentFilters: "Provoni të rregulloni kërkimin ose filtrat tuaj.",
    unspecified: "E papërcaktuar",
    updateEmailDesc: "Përditësoni adresën tuaj të email-it",
    updateListing: "Rifresko listimin",
    updateListingHint: "Shto një etiketë të re për të dalë në pah.",
    useAccountPhone: "Përdor telefonin e llogarisë",
    verificationError: "Gabim gjatë dërgimit të verifikimit:",
    verificationSent: "Email-i i verifikimit u dërgua.",
    verified: "I verifikuar",
    verifiedHint: "Ruani besimin me profile të verifikuara.",
    verifyEmailFirst: "Ju lutemi verifikoni email-in para postimit.",
    verifyEmailHint: "Ne dërguam një link verifikimi në kutinë tuaj të hyrjes.",
    verifyFootnote: "Këshillë: mund të zgjasë një minutë.",
    verifying: "Duke u kontrolluar...",
    verifyLater: "Verifiko më vonë",
    verifyPhone: "Verifiko Numrin e Telefonit",
    verifyYourEmail: "Verifikoni email-in tuaj",
    view: "Shiko",
    websiteLabel: "Website",
    whyTrustUs: "Pse Local Support Market?",
    accountTitle: "Llogaria",
    active: "Aktiv",
    allCategories: "Të gjitha kategoritë",
    allExpiry: "Të gjitha",
    allListingsHint: "Shikoni dhe filtroni të gjitha njoftimet e verifikuara.",
    allLocations: "Të gjitha vendndodhjet",
    allStatuses: "Të gjitha statuseve",
    amount: "Shuma",
    areaLabel: "Zona",
    authOptional: "Identifikimi (Opsional)",
    browse: "Shfleto Njoftimet",
    city: "qytet",
    cityLabel: "Qyteti",
    cityShortcuts: "Qytetet e njohura",
    clearSearch: "Pastro kërkimin",
    closeFilters: "Mbyll filtrat",
    communityTagline: "Shërbime lokale të besuara",
    confirmPassword: "Konfirmo Fjalëkalimin",
    contactEditLocked: "Numri i telefonit nuk mund të ndryshohet këtu. Përditësojeni atë te cilësimet e Llogarisë.",
    coverImage: "Imazhi i kopertinës",
    date: "Data",
    emailSameAsCurrent: "Ju lutemi jepni një adresë tjetër email-i",
    emailUpdateSuccessVerify: "Email-i u përditësua me sukses! Ju lutemi kontrolloni email-in tuaj të ri për verifikim.",
    enterPhone: "Ju lutemi shkruani numrin tuaj të telefonit",
    enterName: "Ju lutemi shkruani emrin tuaj",
    errorOccured: "Ndodhi një gabim. Ju lutemi provoni përsëri më vonë.",
    exploreHeroSubtitle: "Përdorni filtrat e shpejtë për të mbajtur kartat e rregullta dhe hapni detajet kur të jeni gati.",
    exploreHeroTitle: "Eksploroni njoftimet lokale të besuara",
    failed: "Dështoi",
    favoritesOnly: "Vetëm të preferuarat",
    filterByCategory: "Filtro sipas kategorisë",
    filterByLocation: "Filtro sipas vendndodhjes",
    filterHelper: "Ngushtoni kërkimin sipas emrit, qytetit, kategorisë ose preferencës së renditjes.",
    filterSubtitle: "Rafinoni kërkimin tuaj",
    growthStepPostDesc: "Nisni me kontakt të verifikuar, etiketë qyteti dhe dritare çmimi.",
    growthStepRespond: "Përgjigju kudo",
    growthStepRespondDesc: "Kartat kompakte dhe veprimet e shpejtë mbeten të lehta për t'u përdorur në celular.",
    growthStepShare: "Shpërndaj shpejt",
    invalidCredentials: "Email-i ose fjalëkalimi i pavlefshëm.",
    language: "Gjuha",
    loginSuccess: "Hyrja u krye me sukses!",
    loginToPost: "Ju lutemi hyni për të postuar një njoftim",
    loginWithEmail: "Hyni me Linkun e Email-it",
    manageListingsHint: "Menaxhoni gjithçka në një vend",
    map: "Harta",
    mkRibbonSubtitle: "Pamje e fokusuar në lokalen, gjuhë miqësore shqipe dhe shkurtore qytetesh që njihni.",
    mkRibbonTitle: "Ndërtuar për Maqedoninë e Veriut",
    months: "muaj",
    mustLoginToCreate: "Duhet të jeni të hyrë për të krijuar një njoftim",
    neighborhoodFriendly: "Navigim miqësor për lagjen",
    networkError: "Gabim rrjeti. Kontrolloni lidhjen tuaj.",
    no: "Jo",
    noTransactions: "Ende nuk ka transaksione.",
    passwordIncorrect: "Fjalëkalimi i pasaktë. Ju lutemi provoni përsëri.",
    passwordMismatch: "Fjalëkalimet nuk përputhen.",
    postingReady: "Gati për postim",
    preview: "Shikim paraprak",
    priceRangePlaceholder: "Gama e çmimit (p.sh. 500 - 800 MKD)",
    profile: "Profili",
    quickFilters: "Filtrat e shpejtë",
    refineResults: "Rafino rezultatet",
    resendCode: "Ridërgo Kodin",
    resetFilters: "Resetoni filtrat",
    resultsSummary: "Renditur sipas vlerësimit me përshkrime të shkurtuara për skanim të lehtë.",
    reviewsLabel: "Vlerësime",
    searchPlaceholder: "Kërko sipas emrit ose përshkrimit...",
    shareHint: "Shpërndani njoftimin tuaj me fqinjët për të mbledhur feedback dhe për të rritur dukshmërinë.",
    signedUp: "U regjistrua",
    socialShortPlaceholder: "Social / Website",
    sortBy: "Rendit sipas",
    sortOldest: "Më të vjetrat",
    spotlightHint: "Një karusel i njoftimeve të besuara që qëndron i dukshëm pa lëvizje të pafundme.",
    success: "Sukses",
    tagsFieldLabel: "Etiketat",
    tagsLabel: "Etiketat",
    tagsShortPlaceholder: "Etiketat (opsionale)",
    todaySpotlight: "Bordi i vëmendjes së sotme",
    transactionHistory: "Historia e Transaksioneve",
    transactions: "Transaksionet",
    updateProfile: "Përditëso Profilin",
    uploadCoverLocal: "Ngarko kopertinën (lokale)",
    verifiedLabel: "I verifikuar",
    verifyCurrentEmailFirst: "Ju lutemi verifikoni adresën tuaj aktuale të email-it përpara se ta ndryshoni atë.",
    viewDetails: "Shiko Detajet",
    websiteFieldLabel: "Website / Link social",
    websitePlaceholder: "Ngjitni një link (opsionale)",
    yes: "Po",
    removeFilter: "Largo filtrin",
    listingDeleted: "Listimi u fshi",
    notSignedIn: "Nuk jeni kyçur.",
    saveSuccess: "U ruajt me sukses!",
    sendingCode: "Duke dërguar kodin...",
    verifying: "Duke verifikuar...",
    verifyCode: "Verifiko Kodin",
    phoneAlreadyInUse: "Ky numër telefoni është tashmë në përdorim nga një llogari tjetër.",
    phoneAlreadyInUseTitle: "Numri i telefonit është në përdorim",
    invalidPhone: "Numër telefoni i pavlefshëm.",
    errorOccurred: "Ndodhi një gabim.",
    copiedToClipboard: "U kopjua në clipboard!",
    shareVia: "Shpërndaj përmes",
    loginToSeeMore: "Kyçuni për të parë më shumë",
    noAccount: "Nuk keni llogari?",
    alreadyHaveAccount: "Keni llogari?",
    forgotPassword: "Keni harruar fjalëkalimin?",
    resetPassword: "Rivendos fjalëkalimin",
    emailRequired: "Email-i është i detyrueshëm.",
    phoneRequired: "Numri i telefonit është i detyrueshëm.",
    passwordRequired: "Fjalëkalimi është i detyrueshëm.",
    invalidEmail: "Adresë email-i e pavlefshme.",
    unauthorized: "Qasje e paautorizuar.",
    forbidden: "Qasje e ndaluar.",
    sessionExpired: "Seanca ka skaduar. Ju lutemi kyçuni përsëri.",
    loadingMore: "Duke ngarkuar më shumë...",
    noMoreData: "Nuk ka më të dhëna për të ngarkuar.",
    searchNoResults: "Nuk u gjet asnjë rezultat për kërkimin tuaj.",
    somethingWentWrong: "Diçka shkoi keq. Ju lutemi provoni përsëri.",
    tryAgain: "Provo përsëri",
    goBack: "Kthehu mbrapa",
    pageNotFound: "Faqja nuk u gjet.",
    home: "Kreu",
    dashboard: "Paneli",
    settings: "Cilësimet",
    profile: "Profili",
    security: "Siguria",
    notifications: "Njoftimet",
    help: "Ndihmë",
    faq: "Pyetjet e shpeshta",
    contactUs: "Na kontaktoni",
    reportListing: "Raporto Listimin",
    reportReason: "Arsyeja e raportimit",
    spam: "Spam",
    inappropriate: "Përmbajtje e papërshtatshme",
    other: "Tjetër",
    sendReport: "Dërgo Raportin",
    reportSuccess: "Listimi u raportua. Faleminderit.",
    deleteAccount: "Fshi Llogarinë",
    deleteAccountConfirm: "Jeni të sigurt se dëshironi të fshini llogarinë tuaj? Ky veprim nuk mund të zhbëhet dhe do të fshijë të gjitha listimet tuaja.",
    dangerZoneDesc: "Veprime të pakthyeshme të llogarisë",
    deleteAccountWarning: "Pasi të fshini llogarinë tuaj, nuk ka kthim prapa. Ju lutemi të jeni të sigurt.",
    editProfile: "Ndrysho Profilin",
    displayName: "Emri i shfaqjes",
    profileUpdated: "Profili u përditësua me sukses",
    accountDeleted: "Llogaria juaj është fshirë",
    dangerZone: "Zona e Rrezikut",
    report: "Raporto",
    termsOfService: "Kushtet e Shërbimit",
    reviewNotificationSubject: "Recension i ri për oazën tuaj",
    reviewNotificationText: "Përshëndetje, dikush sapo ka lënë një recension për oazën tuaj.",
    reviewNotificationComment: "Koment",
    reviewNotificationCheck: "Shikoje këtu",
    seoTitle: "BizCall - Shërbime Lokale",
    seoDescription: "Gjeni dhe ndani shërbime lokale të besueshme në të gjithë Maqedoninë e Veriut",
    seoKeywords: "shërbime lokale, tregu, Maqedonia e Veriut, Shkup, Tetovë",
    page: "Faqe",
    of: "nga",
    exploreSubtitle: "Gjeni dhe ndani shërbime lokale të besueshme në të gjithë Maqedoninë e Veriut",
    allCities: "Të gjithë qytetet",
    privacyPolicy: "Politika e Privatësisë",
    cookiesPolicy: "Politika e Cookies",
    allRightsReserved: "Të gjitha të drejtat e rezervuara.",
    madeWithLove: "Ndërtuar me dashuri në Maqedoninë e Veriut",
    version: "Versioni",
    build: "Build",
    // Added/Refined keys
    differentEmailRequired: "Ju lutemi jepni një adresë tjetër email-i",
    verifyCurrentEmailBeforeChange: "Ju lutemi verifikoni adresën tuaj aktuale të email-it përpara se ta ndryshoni atë.",
    addPhoneInAccountSettings: "Shtoni telefonin tuaj në cilësimet e llogarisë së pari.",
    createListing: "Krijo listim",
    browseListings: "Shfleto listimet",
    emailChangeRestricted: "⚠️ Ndryshimi i email-it është i kufizuar nga Firebase. Email-i juaj i ri është ruajtur në profil, por do t'ju duhet të dilni dhe të hyni përsëri me adresën tuaj të re të email-it. Përndryshe, kontaktoni mbështetjen për të mundësuar ndryshimet e email-it në Firebase Console.",
    reviewRestrictedSignin: "⚠️ Reagimi është i kufizuar. Duhet të jeni të hyrë për të lënë feedback.",
    reviewRestrictedVerified: "⚠️ Vetëm përdoruesit e verifikuar që nuk e kanë vlerësuar ende këtë listim mund të lënë feedback.",
    emailChangeFailed: "Ndryshimi i email-it dështoi. Firebase ka kufizuar ndryshimet e email-it. Ju lutemi kontaktoni mbështetjen.",
    emailInUse: "Ky email është tashmë në përdorim nga një llogari tjetër.",
    recentLoginRequired: "Ju lutemi dilni dhe hyni përsëri përpara se të ndryshoni email-in tuaj.",
    emailEnumProtection: "Ndryshimet e email-it janë bllokuar nga 'Email Enumeration Protection' në Firebase.",
    previousPage: "Faqja e mëparshme",
    nextPage: "Faqja tjetër",
    callAction: "Telefono",
    share: "Shpërndaj",
    day: "ditë",
    days: "ditë",
    all: "Të gjitha",
    allCategories: "Të gjitha kategoritë",
    allLocations: "Të gjitha vendndodhjet",
    any: "Çdo",
    confirmDelete: "A jeni të sigurt që dëshironi ta fshini këtë listim?",
    emailAction: "Email",
    shareAction: "Shpërndaj",
    websiteLabel: "Faqja e internetit",
    unspecified: "E paspecifikuar",
    notOwner: "Ju nuk jeni pronari i këtij listimi.",
    verifyEmailFirst: "Ju lutemi verifikoni email-in tuaj së pari.",
    saveSuccess: "Ndryshimet u ruajtën me sukses!",
    subscriptionUpdated: "Abonimi u përditësua me sukses!",
    errorUpdatingSubscription: "Gabim në përditësimin e abonimit",
    passwordRequired: "Kërkohet fjalëkalimi për këtë veprim.",
    enterValidPhone: "Ju lutemi shkruani një numër telefoni të vlefshëm.",
    codeSent: "Kodi u dërgua me sukses!",
    enterCode: "Shkruani kodin e verifikimit",
    phoneUpdated: "Numri i telefonit u përditësua me sukses!",
    errorUpdatingPhone: "Gabim në përditësimin e numrit të telefonit:",
    reauthRequired: "Ju lutemi dilni dhe hyni përsëri për të fshirë llogarinë tuaj.",
    error: "Gabim:",
    enterEmail: "Ju lutemi shkruani email-in tuaj",
    signedIn: "I kyçur",
    loginRequired: "Ju lutemi hyni për të vazhduar.",
    enterValidEmail: "Ju lutemi shkruani një email të vlefshëm.",
    enterCurrentPassword: "Ju lutemi shkruani fjalëkalimin tuaj aktual.",
    emailChangeNotAvailable: "Ndryshimi i email-it nuk është i disponueshëm për këtë llogari.",
    emailUpdateSuccess: "Email-i u përditësua me sukses.",
    emailUpdateError: "Nuk mund të përditësohej email-i.",
    // Legal Modals
    termsLastUpdated: "Përditësuar së fundmi:",
    termsIntro: "Mirësevini në BizCall. Duke përdorur aplikacionin tonë, ju pranoni këto kushte.",
    terms1Title: "1. Pranimi i Kushteve",
    terms1Text: "Duke hyrë dhe përdorur këtë shërbim, ju pranoni dhe bini dakord të jeni të lidhur me kushtet dhe dispozitat e kësaj marrëveshjeje.",
    terms2Title: "2. Sjellja e Përdoruesit",
    terms2Text: "Ju pranoni të përdorni shërbimin vetëm për qëllime të ligjshme. Ju jeni përgjegjës për të gjithë përmbajtjen që postoni.",
    terms2List1: "Jo spam ose përmbajtje mashtruese.",
    terms2List2: "Jo mallra ose shërbime të paligjshme.",
    terms2List3: "Jo ngacmime ose gjuhë urrejtjeje.",
    terms3Title: "3. Rregullat e Listimit",
    terms3Text: "Ne rezervojmë të drejtën të heqim çdo listim që shkel politikat tona pa rimbursim.",
    terms4Title: "4. Përgjegjësia",
    terms4Text: "BizCall është një platformë që lidh përdoruesit. Ne nuk jemi përgjegjës për cilësinë e shërbimeve të ofruara nga përdoruesit.",
    terms5Title: "5. Ndërprerja",
    terms5Text: "Ne mund të ndërpresim qasjen tuaj në faqe, pa shkak ose njoftim.",
    privacyLastUpdated: "Përditësuar së fundmi:",
    privacyIntro: "Privatësia juaj është e rëndësishme për ne. Kjo politikë shpjegon se si ne trajtojmë të dhënat tuaja.",
    privacy1Title: "1. Informacioni që Mbledhim",
    privacy1Text: "Ne mbledhim informacione që ju na jepni drejtpërdrejt, si adresa e emailit, numri i telefonit dhe detajet e listimit.",
    privacy2Title: "2. Si i Përdorim Informacionet",
    privacy2Text: "Ne i përdorim informacionet tuaja për të operuar dhe përmirësuar shërbimet tona, për të lehtësuar pagesat dhe për të komunikuar me ju.",
    privacy3Title: "3. Ndarja e Të Dhënave",
    privacy3Text: "Ne nuk i shesim të dhënat tuaja personale. Ne mund të ndajmë të dhëna me ofruesit e shërbimeve (p.sh., Firebase) për të operuar aplikacionin.",
    privacy4Title: "4. Të Drejtat Tuaja",
    privacy4Text: "Ju keni të drejtë të qaseni, përditësoni ose fshini informacionet tuaja personale në çdo kohë përmes cilësimeve të llogarisë suaj.",
    privacy5Title: "5. Kontakt",
    privacy5Text: "Nëse keni pyetje në lidhje me këtë politikë, ju lutemi na kontaktoni."
  },
  mk: {
    // Cookie Consent
    // Plans
    month1: "1 Месец",
    month3: "3 Месеци",
    month6: "6 Месеци",
    month12: "12 Месеци",
    days30: "30 дена",
    days90: "90 дена",
    days180: "180 дена",
    days365: "365 дена",
    selectPlan: "Избери План",
    planBasic: "Основен",
    planStandard: "Стандарден",
    planPro: "Про",
    planPremium: "Премиум",
    closeFilters: "Затвори филтри",
    filterSubtitle: "Прецизирај го твоето пребарување",
    clearSearch: "Исчисти пребарување",
    status: "Статус",
    allStatuses: "Сите статуси",
    allExpiry: "Сите",
    active: "Активен",
    verified: "Верификуван",
    pending: "Во исчекување",
    sortTopRated: "Највисоко оценети",
    sortNewest: "Најнови",
    sortExpiring: "Истекуваат наскоро",
    sortAZ: "А → Ш",
    sortOldest: "Најстари прво",
    unspecified: "Неодредено",
    locationExtra: "Град / село / населба (опционално)",
    phoneAlreadyInUse: "Овој телефонски број е веќе во употреба од друга сметка.",
    verifyCurrentEmailBeforeChange: "Ве молиме потврдете ја вашата тековна е-пошта пред да ја промените.",
    emailChangeRestricted: "Промената на е-пошта е ограничена.",
    passwordIncorrect: "Неточна лозинка.",
    emailInUse: "Оваа е-пошта веќе се користи.",
    contactEditLocked: "Телефонскиот број не може да се промени овде. Ажурирајте го во поставките за сметка.",
    goToAccount: "Одете во сметката",
    priceRangeLabel: "Опсег на цени",
    priceRangePlaceholder: "Опсег на цени (на пр. 500 - 800 МКД)",
    tagsFieldLabel: "Ознаки",
    tagsPlaceholder: "Ознаки, одделени со запирка (опционално)",
    websiteFieldLabel: "Веб-страница / Социјален линк",
    websitePlaceholder: "Залепете линк (опционално)",
    communityTagline: "Доверливи локални услуги",
    reviewsLabel: "Рецензии",
    maxImagesError: "Дозволени се максимум 4 слики",
    confirmDelete: "Дали сте сигурни дека сакате да го избришете овој оглас?",
    addPhoneInAccountSettings: "Додадете го вашиот телефон во поставките за сметка прво.",
    cookieConsentText: "Користиме колачиња за да се осигураме дека ќе го добиете најдоброто искуство на нашата веб-страница.",
    accept: "Прифати",
    // General
    reauthRequired: "Ве молиме одјавете се и најавете се повторно за да ја избришете вашата сметка.",
    noMyListings: "Сè уште немате огласи",
    myListingsSubtitle: "Управувајте со вашите активни и истечени огласи",
    exploreSubtitle: "Прелистајте ги сите верификувани огласи во вашата област",
    differentEmailRequired: "Ве молиме внесете различна е-пошта",
    emailChangeFailed: "Промената на е-пошта не успеа.",
    recentLoginRequired: "Ве молиме одјавете се и најавете се повторно пред да ја промените вашата е-пошта.",
    emailEnumProtection: "Промените на е-пошта се блокирани од безбедносни причини.",
    privacyPolicy: "Политика за приватност",
    allRightsReserved: "Сите права се задржани.",
    madeWithLove: "Направено со љубов во Северна Македонија",
    version: "Верзија",
    build: "Верзија",
    cookiesPolicy: "Политика за колачиња",
    images: "Слики",
    uploadImages: "Вчитај слики",
    updateProfileDesc: "Ажурирајте го вашиот јавен профил",
    displayName: "Име за Приказ",
    displayNamePlaceholder: "Внесете го вашиот приказен имиња",
    saveChanges: "Зачувај Промени",
    accountSettings: "Поставки за Сметка",
    dangerZone: "Опасна Зона",
    dangerZoneDesc: "Неповратни акции со сметката",
    deleteAccount: "Избриши Сметка",
    deleteAccountWarning: "Откако ќе ја избришете вашата сметка, нема повраток. Ве молиме бидете сигурни.",
    legal: "Правни",
    readTerms: "Прочитајте ги нашите услови",
    readPrivacy: "Прочитајте ја нашата политика за приватност",
    reportListing: "Пријави оглас",
    reportReason: "Причина за пријавување",
    spam: "Спам",
    inappropriate: "Несоодветна содржина",
    other: "Друго",
    sendReport: "Испрати пријава",
    reportSuccess: "Огласот е пријавен. Ви благодариме.",
    accountDeleted: "Вашата сметка е избришана",
    profileUpdated: "Профилот е успешно ажуриран",
    report: "Пријави",
    ",": ",",
    title: "Локален пазар за поддршка",
    appName: "Локален пазар за поддршка",
    bizcallLogo: "BizCall лого",
    previewAlt: "преглед",
    close: "Затвори",
    welcome: "Добредојдовте!",
    hello: "Здраво",
    logout: "Одјави се",
    loading: "Се вчитува...",
    cancel: "Откажи",
    save: "Зачувај",
    continue: "Продолжи",
    back: "Назад",
    noListingsYet: "Сè уште нема огласи",
    signedOutAs: "Одјави се",
    categories: "Категории",
    responsiveLayout: "Респонзивен изглед",
    category: "Категорија",
    location: "Локација",
    contact: "Телефон за контакт",
    login: "Најава",
    email: "Е-пошта",
    password: "Лозинка",
    food: "Храна",
    car: "Автомобил",
    electronics: "Електроника",
    homeRepair: "Поправки дома",
    health: "Здравје",
    education: "Едукација",
    clothing: "Облека",
    pets: "Миленичиња",
    services: "Услуги",
    tech: "Технологија",
    entertainment: "Забава",
    events: "Настани",
    other: "Друго",
    // Header / Navigation
    openDashboard: "Отвори го панелот",
    closeDashboard: "Затвори го панелот",
    myListings: "Мои огласи",
    account: "Сметка",
    explore: "Истражи",
    homepage: "Почетна",
    community: "Пазар на заедницата",
    primaryNav: "Главна навигација",
    // Hero / Landing
    heroTitle: "Најди и сподели доверливи услуги низ цела Македонија",
    heroSubtitle: "Од Скопје до Охрид, пронајди локалци кои можат да ти помогнат денес или покажи ја својата експертиза.",
    quickStart: "Брз почеток",
    heroPanelTitle: "Објави со доверба",
    heroPanelSubtitle: "Додај ги твоите детали, избери го твојот план и дозволи им на соседите да те контактираат со проверени информации за контакт.",
    heroPointOne: "Избери категорија, град и краток опис.",
    heroPointTwo: "Потврди ја твојата е-пошта или телефон за дополнителна доверба.",
    heroPointThree: "Истакни ја твојата понуда и времетраење за да останеш видлив.",
    homepageReboot: "Нов респонзивен центар",
    ctaWatchDemo: "Погледни ја турата",
    mobileFirstTitle: "Респонзивен по дифолт",
    mobileFirstSubtitle: "Изгледот се прилагодува грациозно на телефони, таблети и десктоп компјутери.",
    growthBoardTitle: "План за раст",
    growthBoardSubtitle: "Биди пронајден побрзо",
    growthBoardHelper: "Три чекори кои го одржуваат твојот оглас видлив и над главниот дел.",
    trafficIdeasTitle: "Идеи за сообраќај",
    trafficIdeasSubtitle: "Задржи ги очите на твојот оглас",
    trafficIdeasTrending: "Карусел со трендови",
    trafficIdeasFeedback: "Собери одговори",
    trafficIdeasFeedbackDesc: "Прикажи рецензии, ознаки и верификација за инстант доверба.",
    trafficIdeasLocal: "Локален фокус",
    trafficIdeasLocalDesc: "Користи ги градските и категорийските чипови за да ги насочиш купувачите во близина.",
    growthStepPost: "Објави денес",
    subscriptionUpdated: "Претплатата е успешно ажурирана!",
    errorUpdatingSubscription: "Грешка при ажурирање на претплатата",
    emailSubscription: "Претплата преку е-пошта",
    subscribeToWeeklyEmails: "Претплатете се на неделни е-пошти",
    phoneUpdated: "Телефонскиот број е успешно ажуриран!",
    errorUpdatingPhone: "Грешка при ажурирање на телефонскиот број:",
    phoneVerified: "Телефонот е верификуван",
    passwordRequired: "Потребна е лозинка за оваа акција.",
    changePhone: "Промени го телефонскиот број",
    newPhone: "Нов телефонски број",
    savePhone: "Зачувај телефон",
    expiry: "Истекување",
    resultsLabel: "резултати",
    removeFilter: "Отстрани филтер",
    aboutListing: "За овој оглас",
    accountDetails: "Вашите детали за сметката",
    accountSince: "Член од",
    accountSubtitle: "Управувајте со вашиот статус, верификација и безбедност.",
    activeFilters: "Активни филтри",
    addPhoneInAccount: "Ве молиме прво додадете го вашиот телефонски број во вашата сметка.",
    addPhoneNumber: "Додај телефонски број",
    averageRating: "Просечна оцена",
    bizCall: "BizCall",
    browseListingsHint: "Прелистај ги сите огласи",
    browseMarketplace: "Прелистај го пазарот",
    call: "Повикај",
    categorySpotlight: "Популарни категории",
    changeEmail: "Промени е-пошта",
    changePassword: "Промени лозинка",
    chooseOnMap: "Избери на мапа",
    cities: "градови",
    clearAll: "Исчисти сè",
    clearFilters: "Исчисти филтри",
    cloudFeedbackNote: "Оцените се чуваат безбедно.",
    codeSent: "Кодот е успешно испратен!",
    commentEmptyError: "Коментарот не може да биде празен",
    commentPlaceholderDetailed: "Споделете го вашето искуство или поставете прашање.",
    communityFeedback: "Повратни информации од заедницата",
    contactAutofill: "Го користиме телефонот од вашата сметка за доверба и безбедност.",
    contactEmail: "Е-пошта за контакт",
    copied: "Копирано во клипборд",
    copy: "Копирај",
    createAccount: "Креирај сметка",
    createListingHint: "Креирај нов оглас",
    currentPassword: "Тековна лозинка",
    currentPasswordPlaceholder: "Внесете ја тековната лозинка",
    dashboard: "Панел",
    day: "ден",
    days: "дена",
    del: "Избриши",
    description: "Опис",
    edit: "Уреди",
    emailAction: "Е-пошта",
    emailChangeNotAvailable: "Промената на е-пошта не е достапна за оваа сметка.",
    emailLabel: "Е-пошта",
    emailLinkSent: "Испратена врска по е-пошта",
    emailLoginSignup: "Најава / Регистрација преку е-пошта",
    emailTab: "Е-пошта",
    emailUpdateError: "Не можеше да се ажурира е-поштата.",
    emailUpdateSuccess: "Е-поштата е успешно ажурирана.",
    emailVerified: "Е-поштата е потврдена!",
    enterCode: "Внесете го кодот за верификација",
    enterCurrentPassword: "Ве молиме внесете ја вашата тековна лозинка.",
    enterEmail: "Ве молиме внесете ја вашата е-пошта",
    enterValidEmail: "Ве молиме внесете валидна е-пошта.",
    enterValidPhone: "Ве молиме внесете валиден телефонски број.",
    error: "Грешка:",
    errorUpdatingPhone: "Грешка при ажурирање на телефонот:",
    eur: "EUR",
    expired: "Истечен",
    expires: "Истекува",
    expiringSoon: "Истекува наскоро",
    exploreHint: "Пребарувај по категорија, цена и локација.",
    favorite: "Омилено",
    favorites: "Омилени",
    feedbackSaved: "Повратните информации се зачувани",
    feedbackSaveError: "Не можеше да се зачуваат повратните информации.",
    feedbackSidebarBlurb: "Оцените им помагаат на сите да ги видат најдоверливите огласи.",
    fillAllFields: "Ве молиме пополнете ги сите задолжителни полиња.",
    filters: "Филтри",
    getStartedFast: "Започни брзо",
    goToAccount: "Оди до сметката",
    hideFilters: "Скриј филтри",
    homeDigest: "Слика во живо",
    homeHowItWorksTitle: "Како работи",
    homeHowItWorksStep1: "Објавете оглас со вашиот телефонски број, град и краток опис.",
    homeHowItWorksStep2: "Луѓето ве повикуваат или ви пишуваат на Viber / WhatsApp.",
    homeHowItWorksStep3: "Тие оставаат оцени за другите да знаат кој е доверлив.",
    homePopularCategoriesTitle: "Најкористени категории",
    homePopularCitiesTitle: "Популарни градови",
    homeSimpleCtaBrowse: "Прелистај огласи",
    homeSimpleCtaPost: "Објави оглас",
    homeSimpleSubtitle: "Објавете мал оглас со вашиот телефонски број и град.",
    homeSimpleTitle: "Најдете мајстор, продавач или услуга во вашиот град",
    homeSimpleTrustLine: "Без провизии, разговарате директно преку телефон или Viber.",
    invalidCode: "Невалиден код за верификација.",
    iVerified: "Потврдив",
    listedOn: "Објавено на",
    listing: "оглас",
    listingsLabel: "огласи",
    localMissions: "Локални мисии",
    localMissionsDesc: "Ажурирајте го вашиот профил за да ја зголемите видливоста.",
    locationDetails: "Детали за локацијата",
    locationExtra: "Град / село / населба (опционално)",
    locationLabelFull: "Локација",
    locationSetTo: "Локацијата е поставена на",
    loginRequired: "Ве молиме најавете се за да објавите оглас.",
    loginSubtitle: "Пристапете до вашата BizCall сметка.",
    manageListings: "Управувај со огласи",
    maxPrice: "Макс",
    memberSince: "Член од",
    menu: "Мени",
    minPrice: "Мин",
    myListingsHint: "Управувајте, уредувајте и продолжувајте ги вашите огласи.",
    name: "Име на бизнис или услуга",
    newEmail: "Нова е-пошта",
    newEmailPlaceholder: "Внесете нова е-пошта",
    newPassword: "Нова лозинка",
    newPasswordPlaceholder: "Внесете нова лозинка",
    noExpiry: "Без истекување",
    noFeedback: "Сè уште нема повратни информации",
    noListingsAvailable: "Моментално нема достапни огласи.",
    noListingsFound: "Не се пронајдени огласи",
    noListingsMatchFilters: "Ниту еден оглас не одговара на вашите филтри.",
    notOwner: "Можете да го продолжите само вашиот сопствен оглас.",
    notVerifiedYet: "Сè уште не е потврдено. Проверете ја вашата е-пошта.",
    offerPriceLabel: "Опсег на понудена цена (опционално)",
    openInMaps: "Отвори во Мапи",
    passwordChangeNotAvailable: "Промената на лозинка не е достапна за оваа сметка.",
    passwordsDontMatch: "Новите лозинки не се совпаѓаат.",
    passwordTooShort: "Лозинката мора да биде најмалку 6 карактери.",
    passwordUpdateError: "Не можеше да се ажурира лозинката.",
    passwordUpdateSuccess: "Лозинката е успешно ажурирана.",
    pending: "Во исчекување",
    pendingVerification: "Верификацијата е во тек",
    phoneLoginSubtitle: "Најавете се брзо со SMS код на вашиот телефон.",
    phoneNumber: "Телефонски број",
    phoneSynced: "Користење на телефонскиот број од вашата сметка.",
    pickCityChip: "Изберете град за да бидете пронајдени побрзо.",
    postedOn: "Објавено на",
    postingReadyHint: "Огласите го користат вашиот зачуван телефон и локација.",
    postService: "Објави услуга",
    previewDescriptionPlaceholder: "Тука се појавува краток опис...",
    previewTitlePlaceholder: "Име на вашиот бизнис",
    priceLabel: "Цена",
    priceRangeLabel: "Опсег на цени",
    pricing: "Цени",
    profileInfo: "Информации за профилот",
    quickActions: "Брзи акции",
    quickFacts: "Брзи факти",
    ratingLabel: "Ваша оцена",
    recentFeedback: "Неодамнешни повратни информации",
    remaining: "преостанато",
    repeatNewPassword: "Повторете ја новата лозинка",
    repeatNewPasswordPlaceholder: "Повторете ја новата лозинка",
    reputation: "Репутација",
    resendEmail: "Препрати е-пошта",
    resendVerificationEmail: "Препрати е-пошта за верификација",
    resultsPerPage: "По страница",
    reviews: "рецензии",
    saveEmail: "Зачувај е-пошта",
    saveFeedback: "Зачувај повратни информации",
    savePassword: "Зачувај лозинка",
    saving: "Се зачувува...",
    search: "Пребарај",
    securitySettings: "Безбедност и најава",
    securitySettingsText: "Ажурирајте ги вашата е-пошта и лозинка.",
    selectCategory: "Избери категорија",
    selectCity: "Избери град",
    sendLink: "Испрати врска за најава",
    sendVerifyLink: "Испрати врска за верификација",
    share: "Сподели",
    shareCopied: "Врската до огласот е копирана ✅",
    shareLinkHint: "Испратете ја врската до вашиот оглас на соседите.",
    shareListing: "Сподели оглас",
    shareNotSupported: "Овој уред не поддржува споделување.",
    shareText: "Споделено од Local Support Market",
    showFilters: "Прикажи филтри",
    signedIn: "Најавен",
    signedOut: "Одјавен",
    signInWithPhone: "Телефонски број",
    signup: "Регистрирај се",
    signupSubtitle: "Креирајте ја вашата BizCall сметка.",
    signupSuccess: "Сметката е успешно креирана!",
    sixMonths: "6 месеци",
    socialPlaceholder: "Социјални мрежи / Веб (опционално)",
    sortAZ: "А → Ш",
    sortExpiring: "Истекува наскоро",
    sortNewest: "Најнови",
    sortTopRated: "Највисоко оценети",
    spotlightHintHero: "Следете го моментумот и останете верификувани.",
    status: "Статус",
    statusLabel: "Статус",
    stepBasic: "Основно",
    stepDetails: "Детали",
    stepPlanPreview: "План и преглед",
    submitListing: "Објави го твојот оглас",
    submitListingDesc: "Објави, потврди и публикувај за неколку минути.",
    switchToGridView: "Префрли на приказ во мрежа",
    switchToListView: "Префрли на приказ во листа",
    tagsPlaceholder: "Ознаки, одвоени со запирка (опционално)",
    thankYou: "Ви благодариме за вашето плаќање!",
    threeMonths: "3 месеци",
    totalAmount: "Вкупен износ",
    trustPoint1: "Сите огласи се рачно прегледани.",
    trustPoint2: "Директен контакт со бизнисите, без провизии.",
    trustPoint3: "Изградено за градови низ Северна Македонија.",
    trustPoint4: "Опција за пријавување сомнителни огласи.",
    trustSafetyLane: "Патека за доверба и безбедност",
    trustSafetyLaneDesc: "Чувајте ги разговорите безбедни со верификувани контакти.",
    tryDifferentFilters: "Обидете се да го прилагодите вашето пребарување или филтри.",
    twelveMonths: "12 месеци",
    unspecified: "Неодредено",
    updateEmailDesc: "Ажурирајте ја вашата е-пошта",
    updateListing: "Освежи го огласот",
    updateListingHint: "Додајте нова ознака за да се истакнете.",
    useAccountPhone: "Користи го телефонот од сметката",
    verificationError: "Грешка при испраќање верификација:",
    verificationSent: "Испратена е е-пошта за верификација.",
    verified: "Верификуван",
    verifiedHint: "Задржете ја довербата со верификувани профили.",
    verifyEmailFirst: "Ве молиме потврдете ја вашата е-пошта пред објавување.",
    verifyEmailHint: "Испративме врска за верификација на вашата е-пошта.",
    verifyFootnote: "Совет: може да потрае една минута.",
    verifying: "Се проверува...",
    verifyLater: "Потврди подоцна",
    verifyPhone: "Потврди телефонски број",
    verifyYourEmail: "Потврдете ја вашата е-пошта",
    view: "Види",
    websiteLabel: "Веб-страница",
    whyTrustUs: "Зошто Local Support Market?",
    accountTitle: "Сметка",
    active: "Активен",
    allCategories: "Сите категории",
    allExpiry: "Сите",
    allListingsHint: "Прегледајте ги и филтрирајте ги сите верификувани огласи.",
    allLocations: "Сите локации",
    allStatuses: "Сите статуси",
    amount: "Износ",
    areaLabel: "Област",
    authOptional: "Автентикација (Опционално)",
    browse: "Прелистај огласи",
    choosePayment: "Изберете метод на плаќање",
    city: "град",
    cityLabel: "Град",
    cityShortcuts: "Популарни градови",
    clearSearch: "Исчисти пребарување",
    closeFilters: "Затвори филтри",
    communityTagline: "Доверливи локални услуги",
    confirmPassword: "Потврди лозинка",
    contactEditLocked: "Телефонскиот број не може да се промени овде. Ажурирајте го во поставките за Сметка.",
    coverImage: "Насловна слика",
    date: "Датум",
    emailSameAsCurrent: "Ве молиме внесете различна е-пошта",
    emailUpdateSuccessVerify: "Е-поштата е успешно ажурирана! Ве молиме проверете ја вашата нова е-пошта за верификација.",
    enterPhone: "Ве молиме внесете го вашиот телефонски број",
    enterName: "Ве молиме внесете го вашето име",
    errorOccured: "Се појави грешка. Ве молиме обидете се подоцна.",
    exploreHeroSubtitle: "Користете ги брзите филтри за да ги одржувате картичките уредни и отворете ги деталите кога ќе бидете подготвени.",
    exploreHeroTitle: "Истражете доверливи локални огласи",
    failed: "Неуспешно",
    favoritesOnly: "Само омилени",
    filterByCategory: "Филтрирај по категорија",
    filterByLocation: "Филтрирај по локација",
    filterHelper: "Скратете го пребарувањето по име, град, категорија или преференца за сортирање.",
    filterSubtitle: "Прочистете го вашето пребарување",
    growthStepPostDesc: "Започнете со верификуван контакт, ознака за град и опсег на цени.",
    growthStepRespond: "Одговорете насекаде",
    growthStepRespondDesc: "Компактните картички и брзите акции остануваат лесни за користење на мобилен.",
    growthStepShare: "Споделете брзо",
    invalidCredentials: "Невалидна е-пошта или лозинка.",
    language: "Јазик",
    loginSuccess: "Најавата е успешна!",
    loginToPost: "Ве молиме најавете се за да објавите оглас",
    loginWithEmail: "Најавете се со линк преку е-пошта",
    manageListingsHint: "Управувајте со сè на едно место",
    map: "Мапа",
    mkRibbonSubtitle: "Локален распоред, јазик на македонски и кратенки за градови што ги знаете.",
    mkRibbonTitle: "Направено за Северна Македонија",
    months: "месец/и",
    mustLoginToCreate: "Мора да бидете најавени за да креирате оглас",
    neighborhoodFriendly: "Навигација прилагодена на маалските потреби",
    networkError: "Мрежна грешка. Проверете ја вашата врска.",
    no: "Не",
    noTransactions: "Сè уште нема трансакции.",
    passwordIncorrect: "Неточна лозинка. Ве молиме обидете се повторно.",
    passwordMismatch: "Лозинките не се совпаѓаат.",
    plan: "План",
    postingReady: "Објавата е подготвена",
    preview: "Преглед",
    priceRangePlaceholder: "Опсег на цени (на пр. 500 - 800 MKD)",
    profile: "Профил",
    quickFilters: "Брзи филтри",
    refineResults: "Прочисти резултати",
    resendCode: "Препрати код",
    resetFilters: "Ресетирај филтри",
    resultsSummary: "Сортирано по рејтинг со скратени описи за лесно скенирање.",
    reviewsLabel: "Рецензии",
    searchPlaceholder: "Пребарувај по име или опис...",
    shareHint: "Споделете го вашиот оглас со соседите за да соберете повратни информации и да ја зголемите видливоста.",
    signedUp: "Регистриран",
    socialShortPlaceholder: "Социјални мрежи / Веб-страница",
    sortBy: "Сортирај по",
    sortOldest: "Прво најстари",
    spotlightHint: "Рингишпил од доверливи огласи кој останува видлив без бескрајно скролање.",
    success: "Успех",
    tagsFieldLabel: "Тагови",
    tagsLabel: "Тагови",
    tagsShortPlaceholder: "Тагови (опционално)",
    todaySpotlight: "Денешна табла во фокус",
    transactionHistory: "Историја на трансакции",
    transactions: "Трансакции",
    updateProfile: "Ажурирај профил",
    uploadCoverLocal: "Поставете насловна слика (локално)",
    verifiedLabel: "Верификуван",
    verifyCurrentEmailFirst: "Ве молиме верификувајте ја вашата моментална е-пошта пред да ја промените.",
    viewDetails: "Види детали",
    websiteFieldLabel: "Веб-страница / Социјална мрежа",
    websitePlaceholder: "Залепете линк (опционално)",
    yes: "Да",
    removeFilter: "Отстрани филтер",
    listingDeleted: "Огласот е избришан",
    notSignedIn: "Не сте најавени.",
    saveSuccess: "Успешно зачувано!",
    sendingCode: "Се испраќа код...",
    verifying: "Се верификува...",
    verifyCode: "Верификувај код",
    phoneAlreadyInUse: "Овој телефонски број веќе се користи од друга сметка.",
    phoneAlreadyInUseTitle: "Телефонскиот број е веќе во употреба",
    invalidPhone: "Невалиден телефонски број.",
    errorOccurred: "Се појави грешка.",
    copiedToClipboard: "Копирано во клипборд!",
    shareVia: "Сподели преку",
    loginToSeeMore: "Најавете се за да видите повеќе",
    noAccount: "Немате сметка?",
    alreadyHaveAccount: "Веќе имате сметка?",
    forgotPassword: "Ја заборавивте лозинката?",
    resetPassword: "Ресетирај лозинка",
    emailRequired: "Е-поштата е задолжителна.",
    phoneRequired: "Телефонскиот број е задолжителен.",
    passwordRequired: "Лозинката е задолжителна.",
    invalidEmail: "Невалидна е-пошта.",
    unauthorized: "Неовластен пристап.",
    forbidden: "Забранет пристап.",
    sessionExpired: "Сесијата истече. Ве молиме најавете се повторно.",
    loadingMore: "Се вчитуваат повеќе...",
    noMoreData: "Нема повеќе податоци за вчитување.",
    searchNoResults: "Не се пронајдени резултати за вашето пребарување.",
    somethingWentWrong: "Нешто тргна наопаку. Ве молиме обидете се повторно.",
    tryAgain: "Обидете се повторно",
    goBack: "Одете назад",
    pageNotFound: "Страницата не е пронајдена.",
    home: "Почетна",
    dashboard: "Табла",
    settings: "Поставки",
    profile: "Профил",
    security: "Безбедност",
    notifications: "Известувања",
    help: "Помош",
    faq: "ЧПП",
    contactUs: "Контактирајте не",
    termsOfService: "Услови за користење",
    reviewNotificationSubject: "Нова рецензија за вашиот оглас",
    reviewNotificationText: "Здраво, некој штотуку остави рецензија за вашиот оглас.",
    reviewNotificationComment: "Коментар",
    reviewNotificationCheck: "Проверете го овде",
    seoTitle: "BizCall - Локални услуги",
    seoDescription: "Најдете и споделете доверливи локални услуги низ цела Северна Македонија",
    seoKeywords: "локални услуги, пазар, Северна Македонија, Скопје, Тетово",
    page: "Страница",
    of: "од",
    exploreSubtitle: "Најдете и споделете доверливи локални услуги низ цела Северна Македонија",
    allCities: "Сите градови",
    privacyPolicy: "Политика за приватност",
    cookiesPolicy: "Политика за колачиња",
    allRightsReserved: "Сите права се задржани.",
    madeWithLove: "Изработено со љубов во Северна Македонија",
    version: "Верзија",
    build: "Билд",
    // Added/Refined keys
    differentEmailRequired: "Ве молиме внесете поинаква адреса на е-пошта",
    verifyCurrentEmailBeforeChange: "Ве молиме потврдете ја вашата моментална е-пошта пред да ја промените.",
    addPhoneInAccountSettings: "Прво додадете го вашиот телефон во поставките на сметката.",
    createListing: "Креирај оглас",
    browseListings: "Прелистај огласи",
    emailChangeRestricted: "⚠️ Промената на е-пошта е ограничена од Firebase. Вашата нова е-пошта е зачувана во вашиот профил, но ќе треба да се одјавите и да се најавите со вашата нова адреса на е-пошта. Алтернативно, контактирајте со поддршката за да овозможите промени на е-пошта во Firebase Console.",
    reviewRestrictedSignin: "⚠️ Прегледот е ограничен. Мора да бидете најавени за да оставите повратни информации.",
    reviewRestrictedVerified: "⚠️ Само верификуваните корисници кои сè уште не го прегледале овој оглас можат да остават повратни информации.",
    emailChangeFailed: "Промената на е-пошта не успеа. Firebase ги ограничи промените на е-пошта. Ве молиме контактирајте со поддршката.",
    emailInUse: "Оваа е-пошта веќе се користи од друга сметка.",
    recentLoginRequired: "Ве молиме одјавете се и повторно најавете се пред да ја промените вашата е-пошта.",
    emailEnumProtection: "Промените на е-пошта се блокирани од 'Email Enumeration Protection' во Firebase.",
    previousPage: "Претходна страница",
    nextPage: "Следна страница",
    callAction: "Повикај",
    share: "Сподели",
    day: "ден",
    days: "дена",
    all: "Сите",
    allCategories: "Сите категории",
    allLocations: "Сите локации",
    any: "Било кој",
    confirmDelete: "Дали сте сигурни дека сакате да го избришете овој оглас?",
    emailAction: "Е-пошта",
    shareAction: "Сподели",
    websiteLabel: "Веб-страница",
    unspecified: "Неодредено",
    notOwner: "Вие не сте сопственик на овој оглас.",
    verifyEmailFirst: "Ве молиме прво потврдете ја вашата е-пошта.",
    saveSuccess: "Промените се успешно зачувани!",
    // Legal Modals
    termsLastUpdated: "Последно ажурирано:",
    termsIntro: "Добредојдовте во BizCall. Со користење на нашата апликација, се согласувате со овие услови.",
    terms1Title: "1. Прифаќање на условите",
    terms1Text: "Со пристап и користење на оваа услуга, прифаќате и се согласувате да бидете обврзани со условите и одредбите на овој договор.",
    terms2Title: "2. Однесување на корисникот",
    terms2Text: "Се согласувате да ја користите услугата само за законски цели. Вие сте одговорни за целата содржина што ја објавувате.",
    terms2List1: "Без спам или содржина што доведува во заблуда.",
    terms2List2: "Без нелегални стоки или услуги.",
    terms2List3: "Без вознемирување или говор на омраза.",
    terms3Title: "3. Правила за огласување",
    terms3Text: "Го задржуваме правото да отстраниме секој оглас што ги прекршува нашите политики без враќање на средствата.",
    terms4Title: "4. Одговорност",
    terms4Text: "BizCall е платформа што поврзува корисници. Ние не сме одговорни за квалитетот на услугите што ги даваат корисниците.",
    terms5Title: "5. Прекин",
    terms5Text: "Можеме да го прекинеме вашиот пристап до страницата, без причина или известување.",
    privacyLastUpdated: "Последно ажурирано:",
    privacyIntro: "Вашата приватност е важна за нас. Оваа политика објаснува како постапуваме со вашите податоци.",
    privacy1Title: "1. Информации што ги собираме",
    privacy1Text: "Ние собираме информации што ни ги давате директно, како што се вашата адреса за е-пошта, телефонски број и детали за огласот.",
    privacy2Title: "2. Како ги користиме информациите",
    privacy2Text: "Ние ги користиме вашите информации за да работиме и да ги подобриме нашите услуги, да олесниме плаќања и да комуницираме со вас.",
    privacy3Title: "3. Споделување податоци",
    privacy3Text: "Ние не ги продаваме вашите лични податоци. Можеме да споделуваме податоци со даватели на услуги (на пр., Firebase) за да работиме со апликацијата.",
    privacy4Title: "4. Вашите права",
    privacy4Text: "Имате право да пристапите, ажурирате или избришете вашите лични информации во секое време преку поставките на вашата сметка.",
    privacy5Title: "5. Контакт",
    privacy5Text: "Ако имате прашања во врска со оваа политика, ве молиме контактирајте не."
  }
};
const MK_CITIES = [
  "Skopje",
  "Tetovo",
  "Gostivar",
  "Kumanovo",
  "Bitola",
  "Ohrid",
  "Prilep",
  "Veles",
  "Kavadarci",
  "Strumica",
  "Kochani",
  "Shtip",
  "Debar",
  "Kichevo",
  "Struga",
  "Radovish",
  "Gevgelija",
  "Negotino",
  "Sveti Nikole",
  "Delchevo",
  "Vinica",
  "Berovo",
  "Probishtip",
  "Kratovo",
  "Krushevo",
  "Valandovo",
  "Resen",
  "Makedonski Brod",
  "Kriva Palanka",
  "Demir Kapija",
  "Bogdanci",
  "Demir Hisar"
];
const CITIES_WITH_COORDS = [
  { name: "Skopje", lat: 41.9973, lng: 21.428 },
  { name: "Tetovo", lat: 42.0069, lng: 20.9715 },
  { name: "Gostivar", lat: 41.802, lng: 20.9082 },
  { name: "Kumanovo", lat: 42.1354, lng: 21.7146 },
  { name: "Bitola", lat: 41.0314, lng: 21.3347 },
  { name: "Ohrid", lat: 41.1231, lng: 20.8016 },
  { name: "Prilep", lat: 41.3451, lng: 21.555 },
  { name: "Veles", lat: 41.7156, lng: 21.7756 },
  { name: "Kavadarci", lat: 41.4331, lng: 22.0115 },
  { name: "Strumica", lat: 41.4378, lng: 22.6435 },
  { name: "Kochani", lat: 41.9161, lng: 22.4128 },
  { name: "Shtip", lat: 41.7458, lng: 22.1953 },
  { name: "Kichevo", lat: 41.5127, lng: 20.9589 },
  { name: "Struga", lat: 41.178, lng: 20.6761 },
  { name: "Radovish", lat: 41.6389, lng: 22.4642 },
  { name: "Gevgelija", lat: 41.1417, lng: 22.5028 },
  { name: "Negotino", lat: 41.4845, lng: 22.0907 },
  { name: "Sveti Nikole", lat: 41.8696, lng: 21.9527 },
  { name: "Delchevo", lat: 41.9672, lng: 22.7694 },
  { name: "Vinica", lat: 41.8828, lng: 22.5092 },
  { name: "Berovo", lat: 41.7047, lng: 22.8556 },
  { name: "Probishtip", lat: 42.0019, lng: 22.1784 },
  { name: "Kratovo", lat: 42.08, lng: 22.18 },
  { name: "Valandovo", lat: 41.3172, lng: 22.5606 },
  { name: "Resen", lat: 41.0888, lng: 21.0128 },
  { name: "Makedonski Brod", lat: 41.5135, lng: 21.2153 },
  { name: "Kriva Palanka", lat: 42.2, lng: 22.33 },
  { name: "Demir Kapija", lat: 41.4054, lng: 22.2446 },
  { name: "Bogdanci", lat: 41.2031, lng: 22.5753 },
  { name: "Demir Hisar", lat: 41.22, lng: 21.203 }
];
const TermsModal = ({ onClose, t }) => /* @__PURE__ */ jsx("div", { className: "modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), style: { maxWidth: "600px", maxHeight: "80vh", overflowY: "auto", backgroundColor: "#fff" }, children: [
  /* @__PURE__ */ jsx("button", { className: "modal-close", onClick: onClose, children: "×" }),
  /* @__PURE__ */ jsx("h2", { children: t("termsOfService") }),
  /* @__PURE__ */ jsxs("div", { className: "legal-text", style: { lineHeight: "1.6", color: "#4b5563" }, children: [
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("strong", { children: [
      t("termsLastUpdated"),
      " ",
      (/* @__PURE__ */ new Date()).toLocaleDateString()
    ] }) }),
    /* @__PURE__ */ jsx("p", { children: t("termsIntro") }),
    /* @__PURE__ */ jsx("h3", { children: t("terms1Title") }),
    /* @__PURE__ */ jsx("p", { children: t("terms1Text") }),
    /* @__PURE__ */ jsx("h3", { children: t("terms2Title") }),
    /* @__PURE__ */ jsx("p", { children: t("terms2Text") }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: t("terms2List1") }),
      /* @__PURE__ */ jsx("li", { children: t("terms2List2") }),
      /* @__PURE__ */ jsx("li", { children: t("terms2List3") })
    ] }),
    /* @__PURE__ */ jsx("h3", { children: t("terms3Title") }),
    /* @__PURE__ */ jsx("p", { children: t("terms3Text") }),
    /* @__PURE__ */ jsx("h3", { children: t("terms4Title") }),
    /* @__PURE__ */ jsx("p", { children: t("terms4Text") }),
    /* @__PURE__ */ jsx("h3", { children: t("terms5Title") }),
    /* @__PURE__ */ jsx("p", { children: t("terms5Text") })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "modal-actions", style: { marginTop: "20px", display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsx("button", { className: "btn", onClick: onClose, children: t("close") }) })
] }) });
const PrivacyModal = ({ onClose, t }) => /* @__PURE__ */ jsx("div", { className: "modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), style: { maxWidth: "600px", maxHeight: "80vh", overflowY: "auto", backgroundColor: "#fff" }, children: [
  /* @__PURE__ */ jsx("button", { className: "modal-close", onClick: onClose, children: "×" }),
  /* @__PURE__ */ jsx("h2", { children: t("privacyPolicy") }),
  /* @__PURE__ */ jsxs("div", { className: "legal-text", style: { lineHeight: "1.6", color: "#4b5563" }, children: [
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("strong", { children: [
      t("privacyLastUpdated"),
      " ",
      (/* @__PURE__ */ new Date()).toLocaleDateString()
    ] }) }),
    /* @__PURE__ */ jsx("p", { children: t("privacyIntro") }),
    /* @__PURE__ */ jsx("h3", { children: t("privacy1Title") }),
    /* @__PURE__ */ jsx("p", { children: t("privacy1Text") }),
    /* @__PURE__ */ jsx("h3", { children: t("privacy2Title") }),
    /* @__PURE__ */ jsx("p", { children: t("privacy2Text") }),
    /* @__PURE__ */ jsx("h3", { children: t("privacy3Title") }),
    /* @__PURE__ */ jsx("p", { children: t("privacy3Text") }),
    /* @__PURE__ */ jsx("h3", { children: t("privacy4Title") }),
    /* @__PURE__ */ jsx("p", { children: t("privacy4Text") }),
    /* @__PURE__ */ jsx("h3", { children: t("privacy5Title") }),
    /* @__PURE__ */ jsx("p", { children: t("privacy5Text") })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "modal-actions", style: { marginTop: "20px", display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsx("button", { className: "btn", onClick: onClose, children: t("close") }) })
] }) });
function CookieConsent({ t }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);
  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };
  if (!visible) return null;
  return /* @__PURE__ */ jsxs("div", { className: "cookie-consent-banner", children: [
    /* @__PURE__ */ jsx("div", { className: "cookie-content", children: /* @__PURE__ */ jsx("p", { children: t("cookieConsentText") }) }),
    /* @__PURE__ */ jsx("div", { className: "cookie-actions", children: /* @__PURE__ */ jsx("button", { className: "btn btn-primary btn-sm", onClick: handleAccept, children: t("accept") }) })
  ] });
}
const isClient = typeof window !== "undefined";
const NorthMacedoniaMap = isClient ? lazy(() => import("./assets/NorthMacedoniaMap-D-RtQ85F.js")) : () => null;
const Sidebar = isClient ? lazy(() => import("./assets/Sidebar-Bk5U_7a8.js")) : () => null;
const Filtersheet = isClient ? lazy(() => Promise.resolve().then(() => Filtersheet$2)) : () => null;
const EditListingModal = isClient ? lazy(() => import("./assets/EditListingModal-CT9XDAci.js")) : () => null;
const API_BASE = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://localhost:5000" : "https://lsm-wozo.onrender.com";
const categories = [
  "food",
  "car",
  "electronics",
  "homeRepair",
  "health",
  "education",
  "clothing",
  "pets",
  "services",
  "tech",
  "entertainment",
  "events",
  "other"
];
const categoryIcons = {
  food: "🍔",
  car: "🚗",
  electronics: "💡",
  homeRepair: "🧰",
  health: "💅",
  education: "🎓",
  clothing: "👕",
  pets: "🐾",
  services: "💼",
  tech: "💻",
  entertainment: "🎮",
  events: "🎟️",
  other: "✨"
};
const countryCodes = [
  { name: "MK", code: "+389" },
  { name: "AL", code: "+355" },
  { name: "KS", code: "+383" },
  { name: "SR", code: "+381" },
  { name: "GR", code: "+30" },
  { name: "BG", code: "+359" },
  { name: "TR", code: "+90" },
  { name: "DE", code: "+49" },
  { name: "US", code: "+1" }
];
const currencyOptions = ["EUR", "MKD"];
const mkSpotlightCities = [
  "Skopje",
  "Tetovë",
  "Gostivar",
  "Ohër",
  "Kumanovë",
  "Manastir",
  "Prilep",
  "Kërçovë"
];
const PLANS = [
  { id: "1", label: "1 Month", price: "2 EUR", duration: "30 days", priceVal: 2 },
  { id: "3", label: "3 Months", price: "5 EUR", duration: "90 days", priceVal: 5 },
  { id: "6", label: "6 Months", price: "8 EUR", duration: "180 days", priceVal: 8 },
  { id: "12", label: "12 Months", price: "12 EUR", duration: "365 days", priceVal: 12 }
];
const stripDangerous = (v = "") => v.replace(/[<>]/g, "");
const formatOfferPrice = (min, max, currency) => {
  const cleanMin = (min || "").trim();
  const cleanMax = (max || "").trim();
  const cur = currency || "EUR";
  if (!cleanMin && !cleanMax) return "";
  if (cleanMin && cleanMax) return `${cleanMin} - ${cleanMax} ${cur}`;
  if (cleanMin) return `from ${cleanMin} ${cur}`;
  if (cleanMax) return `up to ${cleanMax} ${cur}`;
  return "";
};
const buildLocationString = (city, extra) => {
  const c = (city || "").trim();
  const e = (extra || "").trim();
  if (!c && !e) return "";
  if (c && e) return `${c} - ${e}`;
  return c || e;
};
const getDescriptionPreview = (text = "", limit = 160) => {
  const clean = stripDangerous(text || "").trim();
  if (!clean) return "";
  return clean.length > limit ? `${clean.slice(0, limit).trim()}…` : clean;
};
const HeadManager = ({ title, description, keywords, canonical, image, jsonLd }) => {
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    title && /* @__PURE__ */ jsx("title", { children: title }),
    description && /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    keywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
    title && /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    description && /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    canonical && /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical }),
    image && /* @__PURE__ */ jsx("meta", { property: "og:image", content: image }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    canonical && /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonical }),
    jsonLd && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) })
  ] });
};
const normalizePhoneForStorage = (raw) => {
  if (!raw) return raw;
  const trimmed = raw.trim();
  if (trimmed.startsWith("+")) return trimmed.replace(/\s+/g, "");
  const cleaned = trimmed.replace(/\D/g, "");
  if (cleaned === "") return trimmed;
  if (cleaned.length > 8 && cleaned.startsWith("00")) return "+" + cleaned.replace(/^0{2}/, "");
  const known = countryCodes.map((c) => c.code.replace("+", ""));
  for (const pre of known) if (cleaned.startsWith(pre)) return "+" + cleaned;
  return "+389" + cleaned;
};
const sendEmail = async (to, subject, text) => {
  try {
    const response = await fetch(`${API_BASE}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ to, subject, text })
    });
    return response;
  } catch (err) {
    console.error("sendEmail error:", err);
    throw err;
  }
};
const TabBar = ({ items = [], value, onChange, className = "", size = "default", fullWidth = false }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: [
      "tabs",
      size === "compact" ? "tabs-compact" : "",
      fullWidth ? "tabs-full" : "",
      className
    ].filter(Boolean).join(" "),
    children: items.map((item) => /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: `tab ${value === item.id ? "active" : ""}`,
        onClick: () => onChange == null ? void 0 : onChange(item.id),
        children: [
          item.icon && /* @__PURE__ */ jsx("span", { className: "tab-icon", children: item.icon }),
          /* @__PURE__ */ jsx("span", { className: "tab-label", children: item.label }),
          item.badge !== void 0 && /* @__PURE__ */ jsx("span", { className: "tab-badge", children: item.badge })
        ]
      },
      item.id
    ))
  }
);
const Header = React.memo(({
  t,
  logo: logo2,
  primaryNav,
  selectedTab,
  setSelectedTab,
  lang,
  setLang,
  user,
  onLogout,
  onLogin,
  onMenuOpen
}) => /* @__PURE__ */ jsx("header", { className: "header", children: /* @__PURE__ */ jsxs("div", { className: "header-inner", children: [
  /* @__PURE__ */ jsx(
    "button",
    {
      className: "icon-btn mobile-menu-btn",
      onClick: onMenuOpen,
      "aria-label": t("menu"),
      children: /* @__PURE__ */ jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
        /* @__PURE__ */ jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
        /* @__PURE__ */ jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
      ] })
    }
  ),
  /* @__PURE__ */ jsxs("button", { onClick: () => setSelectedTab("main"), className: "brand", children: [
    /* @__PURE__ */ jsx("div", { className: "brand-mark", children: /* @__PURE__ */ jsx("div", { className: "brand-logo-wrap", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: logo2,
        alt: t("bizcallLogo"),
        className: "brand-logo",
        loading: "lazy"
      }
    ) }) }),
    /* @__PURE__ */ jsxs("div", { className: "brand-text", children: [
      /* @__PURE__ */ jsx("h1", { className: "brand-title", children: t("bizCall") }),
      /* @__PURE__ */ jsx("p", { className: "brand-tagline", children: t("communityTagline") })
    ] })
  ] }),
  /* @__PURE__ */ jsx("nav", { className: "header-nav desktop-nav", "aria-label": t("primaryNav"), children: primaryNav.map((item) => /* @__PURE__ */ jsxs(
    "button",
    {
      style: { color: "#000" },
      className: `nav-chip ${selectedTab === item.id ? "active" : ""}`,
      onClick: () => setSelectedTab(item.id),
      children: [
        /* @__PURE__ */ jsxs("span", { className: "nav-chip-label", children: [
          item.icon,
          " ",
          item.label
        ] }),
        item.badge !== void 0 && /* @__PURE__ */ jsx("span", { className: "nav-chip-badge", children: item.badge })
      ]
    },
    item.id
  )) }),
  /* @__PURE__ */ jsxs("div", { className: "header-actions", children: [
    /* @__PURE__ */ jsxs("select", { className: "lang-select", value: lang, onChange: (e) => setLang(e.target.value), children: [
      /* @__PURE__ */ jsx("option", { value: "sq", children: "🇦🇱 SQ" }),
      /* @__PURE__ */ jsx("option", { value: "mk", children: "🇲🇰 MK" }),
      /* @__PURE__ */ jsx("option", { value: "en", children: "🇬🇧 EN" })
    ] }),
    user ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("button", { className: "btn btn-ghost desktop-only", onClick: onLogout, children: t("logout") }) }) : /* @__PURE__ */ jsx(
      "button",
      {
        className: "btn desktop-only",
        onClick: onLogin,
        children: t("login")
      }
    )
  ] })
] }) }));
function App({ initialListings = [], initialPublicListings = [] }) {
  var _a2, _b2, _c, _d, _e;
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lang") || "sq";
    }
    return "sq";
  });
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const t = useCallback(
    (k) => {
      var _a3, _b3;
      return ((_a3 = TRANSLATIONS[lang]) == null ? void 0 : _a3[k]) ?? ((_b3 = TRANSLATIONS.sq) == null ? void 0 : _b3[k]) ?? k;
    },
    [lang]
  );
  useEffect(() => {
    localStorage.setItem("lang", lang);
    if (user) {
      update(ref(db, `users/${user.uid}`), { language: lang }).catch((err) => {
        console.warn("Failed to sync language to profile:", err);
      });
    }
  }, [lang, user]);
  const [form, setForm] = useState({
    step: 1,
    name: "",
    category: "",
    locationCity: "",
    locationExtra: "",
    locationData: null,
    // { city, area, lat, lng, mapsUrl } if you want later
    description: "",
    contact: "",
    offerMin: "",
    offerMax: "",
    offerCurrency: "EUR",
    offerprice: "",
    // preformatted price string, saved in DB
    tags: "",
    socialLink: "",
    imagePreview: null,
    // local-only preview
    images: [],
    // array of base64 strings (max 4)
    plan: "1"
    // "1", "3", "6", "12"
  });
  const [listings, setListings] = useState(() => {
    if (initialListings && initialListings.length > 0) return initialListings;
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("cached_listings");
      return cached ? JSON.parse(cached) : [];
    }
    return [];
  });
  const [publicListings, setPublicListings] = useState(() => {
    if (initialPublicListings && initialPublicListings.length > 0) return initialPublicListings;
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("cached_listings");
      return cached ? JSON.parse(cached) : [];
    }
    return [];
  });
  const [userListings, setUserListings] = useState([]);
  const [listingsLoading, setListingsLoading] = useState(() => {
    if (initialListings && initialListings.length > 0) return false;
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("cached_listings");
      return !cached;
    }
    return true;
  });
  const deferredListings = useDeferredValue(listings);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "info" });
  const showMessage = useCallback((text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "info" }), 5e3);
  }, []);
  const [selectedListing, setSelectedListing] = useState(null);
  const [initialListingId, setInitialListingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTabState] = useState("main");
  const [viewMode, setViewMode] = useState("list");
  const [showPostForm, setShowPostForm] = useState(false);
  const setSelectedTab = useCallback((tab) => {
    setSelectedTabState(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [editingListing, setEditingListing] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [extendModalOpen, setExtendModalOpen] = useState(false);
  const [extendTarget, setExtendTarget] = useState(null);
  const [selectedExtendPlan, setSelectedExtendPlan] = useState("1");
  const [showEditMapPicker, setShowEditMapPicker] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("spam");
  const [reportDescription, setReportDescription] = useState("");
  const [reportingListingId, setReportingListingId] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [verifyBusy, setVerifyBusy] = useState(false);
  const [resendBusy, setResendBusy] = useState(false);
  const [authTab, setAuthTab] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [countryCode, setCountryCode] = useState("+389");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [postSignupVerifyOpen, setPostSignupVerifyOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({
    newEmail: "",
    currentPassword: ""
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: ""
  });
  const [phoneEditing, setPhoneEditing] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState("+389");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savingPhone, setSavingPhone] = useState(false);
  const [phoneConfirmationResult, setPhoneConfirmationResult] = useState(null);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const handleSubscriptionChange = async (e) => {
    const isChecked = e.target.checked;
    try {
      await update(ref(db, `users/${user.uid}`), {
        subscribedToMarketing: isChecked
      });
      setUserProfile((prev) => ({ ...prev, subscribedToMarketing: isChecked }));
      showMessage(t("subscriptionUpdated"), "success");
    } catch (err) {
      showMessage(t("errorUpdatingSubscription") + " " + err.message, "error");
    }
  };
  const [accountPhone, setAccountPhone] = useState("");
  useEffect(() => {
    setAccountPhone(
      normalizePhoneForStorage((user == null ? void 0 : user.phoneNumber) || (userProfile == null ? void 0 : userProfile.phone) || "")
    );
  }, [user, userProfile]);
  const handleChangePhone = async (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword) {
      showMessage(t("passwordRequired"), "error");
      return;
    }
    const fullPhoneNumber = `${phoneCountryCode}${phoneNumber.replace(/\D/g, "")}`;
    const normalizedPhone = normalizePhoneForStorage(fullPhoneNumber);
    if (!validatePhone(normalizedPhone)) {
      showMessage(t("enterValidPhone"), "error");
      return;
    }
    setSavingPhone(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, passwordForm.currentPassword);
      await reauthenticateWithCredential(user, credential);
      if (!window.recaptchaVerifierAccount) {
        window.recaptchaVerifierAccount = new RecaptchaVerifier(auth, "recaptcha-container-account", {
          size: "invisible"
        });
      }
      const confirmation = await signInWithPhoneNumber(auth, normalizedPhone, window.recaptchaVerifierAccount);
      setPhoneConfirmationResult(confirmation);
      showMessage(t("codeSent"), "success");
    } catch (err) {
      console.error(err);
      let msg = err.message;
      if (err.code === "auth/invalid-phone-number") msg = t("enterValidPhone");
      if (err.code === "auth/credential-already-in-use") msg = t("phoneAlreadyInUse");
      showMessage(msg, "error");
      if (window.recaptchaVerifierAccount) {
        window.recaptchaVerifierAccount.clear();
        window.recaptchaVerifierAccount = null;
      }
    } finally {
      setSavingPhone(false);
    }
  };
  const handleVerifyPhoneCode = async (e) => {
    e.preventDefault();
    if (!phoneVerificationCode || phoneVerificationCode.length < 6) {
      showMessage(t("enterCode"), "error");
      return;
    }
    setSavingPhone(true);
    try {
      const credential = PhoneAuthProvider.credential(
        phoneConfirmationResult.verificationId,
        phoneVerificationCode
      );
      if (user.phoneNumber) {
        await updatePhoneNumber(user, credential);
      } else {
        await linkWithCredential(user, credential);
      }
      const fullPhoneNumber = `${phoneCountryCode}${phoneNumber.replace(/\D/g, "")}`;
      const normalizedPhone = normalizePhoneForStorage(fullPhoneNumber);
      await update(ref(db, `users/${user.uid}`), {
        phone: normalizedPhone
      });
      const userListings2 = listings.filter((l) => l.userId === user.uid);
      const listingUpdates = {};
      userListings2.forEach((l) => {
        listingUpdates[`listings/${l.id}/contact`] = normalizedPhone;
      });
      if (Object.keys(listingUpdates).length > 0) {
        await update(ref(db), listingUpdates);
      }
      setAccountPhone(normalizedPhone);
      setPhoneEditing(false);
      setPhoneConfirmationResult(null);
      setPhoneVerificationCode("");
      showMessage(t("phoneUpdated"), "success");
    } catch (err) {
      console.error(err);
      showMessage(t("errorUpdatingPhone") + " " + err.message, "error");
    } finally {
      setSavingPhone(false);
      setPasswordForm((f) => ({ ...f, currentPassword: "" }));
    }
  };
  const handleDeleteAccount = async () => {
    if (!window.confirm(t("deleteAccountConfirm"))) return;
    try {
      setLoading(true);
      const uid = user.uid;
      await deleteUser(user);
      showMessage(t("accountDeleted"), "success");
      setUser(null);
      setUserProfile(null);
      setSelectedTab("main");
    } catch (err) {
      console.error("Delete account error:", err);
      if (err.code === "auth/requires-recent-login") {
        showMessage(t("reauthRequired") || "Please log out and log in again to delete your account.", "error");
      } else {
        showMessage(err.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    try {
      setLoading(true);
      await updateProfile(user, { displayName: displayName.trim() });
      await update(ref(db, `users/${user.uid}`), { name: displayName.trim() });
      setUserProfile((prev) => ({ ...prev, name: displayName.trim() }));
      showMessage(t("profileUpdated"), "success");
    } catch (err) {
      console.error(err);
      showMessage(err.message, "error");
    } finally {
      setLoading(false);
    }
  };
  const handleReportSubmit = async () => {
    if (!reportingListingId) return;
    try {
      const reportRef = push(ref(db, "reports"));
      await set(reportRef, {
        listingId: reportingListingId,
        reason: reportReason,
        description: reportDescription,
        reporterId: user ? user.uid : "anonymous",
        createdAt: Date.now()
      });
      showMessage(t("reportSuccess"), "success");
      setShowReportModal(false);
      setReportReason("spam");
      setReportDescription("");
      setReportingListingId(null);
    } catch (err) {
      console.error(err);
      showMessage(t("error") + ": " + err.message, "error");
    }
  };
  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);
  const [catFilter, setCatFilter] = useState("");
  const [locFilter, setLocFilter] = useState("");
  const [sortBy, setSortBy] = useState("topRated");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [myListingsStatusFilter, setMyListingsStatusFilter] = useState("all");
  const [myListingsExpiryFilter, setMyListingsExpiryFilter] = useState("all");
  const [myListingsSort, setMyListingsSort] = useState("newest");
  const [myListingsSearch, setMyListingsSearch] = useState("");
  const deferredMyListingsSearch = useDeferredValue(myListingsSearch);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => localStorage.setItem("favorites", JSON.stringify(favorites)), [favorites]);
  const listingLocationLabel = useMemo(() => {
    var _a3, _b3;
    if (!selectedListing) return "";
    return buildLocationString(
      ((_a3 = selectedListing.locationData) == null ? void 0 : _a3.city) || selectedListing.location,
      ((_b3 = selectedListing.locationData) == null ? void 0 : _b3.area) || selectedListing.locationExtra
    ) || t("unspecified");
  }, [selectedListing, t]);
  const listingPriceLabel = useMemo(() => {
    if (!selectedListing) return "";
    return selectedListing.offerprice || t("unspecified");
  }, [selectedListing, t]);
  const listingContactAvailable = !!(selectedListing == null ? void 0 : selectedListing.contact);
  const [feedbackStore, setFeedbackStore] = useState({});
  const [feedbackDraft, setFeedbackDraft] = useState({ rating: 4, comment: "" });
  const [feedbackSaving, setFeedbackSaving] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setShowAuthModal(false);
        setShowMapPicker(false);
        if (editingListing) {
          setEditingListing(null);
          setEditForm(null);
        }
        if (selectedListing) setSelectedListing(null);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [editingListing, selectedListing]);
  useEffect(() => {
    const hasOpenModal = showAuthModal || showPostForm || selectedListing || editingListing || showMapPicker || showEditMapPicker || filtersOpen;
    if (hasOpenModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showAuthModal, showPostForm, selectedListing, editingListing, showMapPicker, showEditMapPicker, filtersOpen]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const listingId = params.get("listing");
    if (listingId) {
      setInitialListingId(listingId);
    }
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab) setSelectedTabState(tab);
    const qParam = params.get("q") || "";
    const catParam = params.get("category") || "";
    const locParam = params.get("city") || "";
    const sortParam = params.get("sort") || "";
    const viewParam = params.get("view") || "";
    const pageParam = parseInt(params.get("page") || "1", 10);
    const pageSizeParam = parseInt(params.get("pageSize") || "12", 10);
    setQ(qParam);
    setCatFilter(catParam);
    setLocFilter(locParam);
    if (sortParam) setSortBy(sortParam);
    if (viewParam) setViewMode(viewParam);
    if (!isNaN(pageParam) && pageParam > 0) setPage(pageParam);
    if (!isNaN(pageSizeParam) && pageSizeParam > 0) setPageSize(pageSizeParam);
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", selectedTab);
    if (selectedTab === "allListings") {
      if (q) params.set("q", q);
      else params.delete("q");
      if (catFilter) params.set("category", catFilter);
      else params.delete("category");
      if (locFilter) params.set("city", locFilter);
      else params.delete("city");
      if (sortBy) params.set("sort", sortBy);
      else params.delete("sort");
      if (viewMode) params.set("view", viewMode);
      else params.delete("view");
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));
    } else {
      params.delete("q");
      params.delete("category");
      params.delete("city");
      params.delete("sort");
      params.delete("view");
      params.delete("page");
      params.delete("pageSize");
    }
    const next = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", next);
  }, [selectedTab, q, catFilter, locFilter, sortBy, viewMode, page, pageSize]);
  useEffect(() => {
    setPage(1);
  }, [q, catFilter, locFilter, sortBy, pageSize, selectedTab]);
  useEffect(() => {
    if (!initialListingId || !listings.length) return;
    const target = listings.find((l) => l.id === initialListingId);
    if (target && target.status === "verified") {
      setSelectedListing(target);
      setInitialListingId(null);
    }
  }, [initialListingId, listings]);
  const [expiryChecked, setExpiryChecked] = useState(false);
  useEffect(() => {
    if (!user || listingsLoading || !deferredListings.length || expiryChecked) return;
    const checkExpiringListings = async () => {
      const userListings2 = deferredListings.filter((l) => l.userId === user.uid && l.status === "verified");
      const now = Date.now();
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1e3;
      const targetEmail = user.email || (userProfile == null ? void 0 : userProfile.email);
      if (!targetEmail) return;
      for (const listing of userListings2) {
        if (listing.expiresAt && !listing.expiryNotified) {
          const timeLeft = listing.expiresAt - now;
          if (timeLeft > 0 && timeLeft <= sevenDaysInMs) {
            const daysLeft = Math.ceil(timeLeft / (24 * 60 * 60 * 1e3));
            const subject = `Listing expiring soon: ${listing.name}`;
            const text = `Hi, your listing "${listing.name}" will expire in ${daysLeft} days. 

Renew it here to keep it active: ${window.location.origin}?tab=myListings`;
            try {
              await sendEmail(targetEmail, subject, text);
              await update(ref(db, `listings/${listing.id}`), { expiryNotified: true });
            } catch (err) {
              console.error("Failed to send expiry notification:", err);
            }
          }
        }
      }
      setExpiryChecked(true);
    };
    checkExpiringListings();
  }, [user, deferredListings, expiryChecked, userProfile, listingsLoading]);
  useEffect(() => auth.onAuthStateChanged((u) => setUser(u)), []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");
    const listingId = params.get("listingId");
    const type = params.get("type");
    if (paymentStatus === "success" && listingId) {
      window.history.replaceState({}, "", window.location.pathname);
      const updateListingAfterPayment = async () => {
        try {
          setLoading(true);
          const updates = {};
          const plan = params.get("plan");
          let durationDays = 30;
          switch (String(plan)) {
            case "1":
              durationDays = 30;
              break;
            case "3":
              durationDays = 90;
              break;
            case "6":
              durationDays = 180;
              break;
            case "12":
              durationDays = 365;
              break;
            default:
              durationDays = 30;
          }
          const durationMs = durationDays * 24 * 60 * 60 * 1e3;
          if (type === "create") {
            updates[`listings/${listingId}/status`] = "verified";
            updates[`listings/${listingId}/pricePaid`] = parseInt(plan) === 1 ? 2 : parseInt(plan) === 3 ? 5 : parseInt(plan) === 6 ? 8 : 12;
            updates[`listings/${listingId}/plan`] = plan;
            updates[`listings/${listingId}/expiresAt`] = Date.now() + durationMs;
            updates[`listings/${listingId}/createdAt`] = Date.now();
          } else if (type === "extend") {
            const snapshot = await get(ref(db, `listings/${listingId}`));
            const listing = snapshot.val();
            if (listing) {
              const currentExpiry = listing.expiresAt || Date.now();
              const newExpiry = Math.max(currentExpiry, Date.now()) + durationMs;
              updates[`listings/${listingId}/expiresAt`] = newExpiry;
              updates[`listings/${listingId}/status`] = "verified";
              updates[`listings/${listingId}/plan`] = plan;
            }
          }
          if (Object.keys(updates).length > 0) {
            await update(ref(db), updates);
            showMessage(type === "extend" ? "Listing extended successfully!" : "Payment successful! Listing activated.", "success");
          }
        } catch (err) {
          console.error("Payment success handling error:", err);
          showMessage("Payment succeeded but listing update failed. Please contact support.", "error");
        } finally {
          setLoading(false);
        }
      };
      updateListingAfterPayment();
    }
  }, []);
  useEffect(() => {
    if (!user) {
      setUserProfile(null);
      return void 0;
    }
    const profileRef = ref(db, `users/${user.uid}`);
    const unsubscribe = onValue(profileRef, (snapshot) => {
      setUserProfile(snapshot.val() || null);
    });
    return () => unsubscribe();
  }, [user]);
  const friendlyName = useMemo(() => {
    if ((userProfile == null ? void 0 : userProfile.name) && userProfile.name.trim()) return userProfile.name.trim();
    if (user == null ? void 0 : user.displayName) return user.displayName;
    if (user == null ? void 0 : user.email) return user.email.split("@")[0];
    return "";
  }, [userProfile, user]);
  useEffect(() => {
    if (userListings.length === 0) {
      setListings((prev) => {
        const sorted = [...publicListings].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        if (prev.length === sorted.length && JSON.stringify(prev) === JSON.stringify(sorted)) {
          return prev;
        }
        return sorted;
      });
    } else {
      const merged = /* @__PURE__ */ new Map();
      publicListings.forEach((l) => merged.set(l.id, l));
      userListings.forEach((l) => merged.set(l.id, l));
      const combined = Array.from(merged.values()).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setListings((prev) => {
        if (prev.length === combined.length && JSON.stringify(prev) === JSON.stringify(combined)) {
          return prev;
        }
        return combined;
      });
    }
    if (publicListings.length > 0) {
      const cacheData = publicListings.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).slice(0, 150).map((l) => ({
        id: l.id,
        name: l.name,
        category: l.category,
        location: l.location,
        locationCity: l.locationCity,
        status: l.status,
        verified: l.verified,
        createdAt: l.createdAt,
        expiresAt: l.expiresAt,
        offerprice: l.offerprice,
        contact: l.contact,
        description: l.description ? l.description.substring(0, 100) + "..." : "",
        userId: l.userId,
        avgRating: l.avgRating,
        feedbackCount: l.feedbackCount
      }));
      const newCache = JSON.stringify(cacheData);
      const currentCache = localStorage.getItem("cached_listings");
      if (currentCache !== newCache) {
        try {
          localStorage.setItem("cached_listings", newCache);
        } catch (e) {
          console.error("Cache storage failed:", e);
          if (e.name === "QuotaExceededError" || e.code === 22) {
            localStorage.removeItem("cached_listings");
          }
        }
      }
    }
  }, [publicListings, userListings]);
  useEffect(() => {
    const verifiedQuery = query(
      ref(db, "listings"),
      orderByChild("status"),
      equalTo("verified"),
      limitToLast(150)
      // Further reduced for speed, matching cache limit
    );
    let isFirstLoad = true;
    const startTime = Date.now();
    get(verifiedQuery).then((snapshot) => {
      const duration = Date.now() - startTime;
      if (duration > 2e3) {
        console.warn(`[Performance] Initial get() took ${duration}ms. Rules are correct, but network or DB might be slow.`);
      }
      const val = snapshot.val() || {};
      const arr = Object.keys(val).map((k) => ({ id: k, ...val[k] }));
      setPublicListings((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(arr)) return prev;
        return arr;
      });
      setListingsLoading(false);
    }).catch((err) => {
      console.error("Initial fetch error:", err);
      setListingsLoading(false);
    });
    const unsubscribe = onValue(verifiedQuery, (snapshot) => {
      if (isFirstLoad) {
        isFirstLoad = false;
        return;
      }
      const val = snapshot.val() || {};
      const arr = Object.keys(val).map((k) => ({ id: k, ...val[k] }));
      setPublicListings((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(arr)) return prev;
        return arr;
      });
    }, (err) => {
      console.error("Public listener error:", err);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (!user) {
      setUserListings([]);
      return void 0;
    }
    const userQuery = query(
      ref(db, "listings"),
      orderByChild("userId"),
      equalTo(user.uid)
    );
    const unsubscribe = onValue(userQuery, (snapshot) => {
      const val = snapshot.val() || {};
      const arr = Object.keys(val).map((k) => ({ id: k, ...val[k] }));
      setUserListings(arr);
    });
    return () => unsubscribe();
  }, [user]);
  useEffect(() => {
    if (!selectedListing) {
      setFeedbackStore({});
      return;
    }
    const feedbackRef = ref(db, `feedback/${selectedListing.id}`);
    const unsubscribe = onValue(feedbackRef, (snapshot) => {
      const val = snapshot.val() || {};
      const entries = Object.values(val).map((entry) => ({
        rating: Number(entry.rating) || 0,
        comment: entry.comment || "",
        createdAt: entry.createdAt || 0,
        userId: entry.userId || null,
        author: entry.author || null
      })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).slice(0, 50);
      setFeedbackStore({ [selectedListing.id]: { entries } });
    });
    return () => unsubscribe();
  }, [selectedListing]);
  const myListingsRaw = useMemo(() => {
    if (!user) return [];
    return deferredListings.filter((l) => l.userId === user.uid);
  }, [deferredListings, user]);
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailForSignIn = window.localStorage.getItem("emailForSignIn");
      if (!emailForSignIn) emailForSignIn = window.prompt(t("enterEmail"));
      if (emailForSignIn) {
        signInWithEmailLink(auth, emailForSignIn, window.location.href).then(() => {
          window.localStorage.removeItem("emailForSignIn");
          showMessage(t("signedIn"), "success");
          setShowAuthModal(false);
        }).catch((err) => showMessage(t("error") + " " + err.message, "error"));
      }
    }
  }, []);
  const handleChangeEmail = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      showMessage(t("loginRequired"), "error");
      return;
    }
    if (!emailForm.newEmail || !validateEmail(emailForm.newEmail)) {
      showMessage(t("enterValidEmail"), "error");
      return;
    }
    if (!emailForm.currentPassword) {
      showMessage(t("enterCurrentPassword"), "error");
      return;
    }
    if (!currentUser.email) {
      showMessage(t("emailChangeNotAvailable"), "error");
      return;
    }
    if (emailForm.newEmail === currentUser.email) {
      showMessage(t("differentEmailRequired"), "error");
      return;
    }
    if (!currentUser.emailVerified) {
      showMessage(t("verifyCurrentEmailBeforeChange"), "error");
      return;
    }
    setSavingEmail(true);
    try {
      const cred = EmailAuthProvider.credential(
        currentUser.email,
        emailForm.currentPassword
      );
      await reauthenticateWithCredential(currentUser, cred);
      try {
        await updateEmail(currentUser, emailForm.newEmail);
        try {
          await sendEmailVerification(currentUser);
        } catch (verifyErr) {
          console.warn("Verification email send failed:", verifyErr);
        }
        await update(ref(db, `users/${currentUser.uid}`), {
          email: emailForm.newEmail
        });
        const userListings2 = listings.filter((l) => l.userId === currentUser.uid);
        const listingUpdates = {};
        userListings2.forEach((l) => {
          listingUpdates[`listings/${l.id}/userEmail`] = emailForm.newEmail;
        });
        if (Object.keys(listingUpdates).length > 0) {
          await update(ref(db), listingUpdates);
        }
        await currentUser.reload();
        const updatedUser = auth.currentUser;
        setUser(updatedUser);
        showMessage(t("emailUpdateSuccess"), "success");
        setEmailForm({ newEmail: "", currentPassword: "" });
      } catch (updateErr) {
        if (updateErr.code === "auth/operation-not-allowed") {
          try {
            await update(ref(db, `users/${currentUser.uid}`), {
              email: emailForm.newEmail,
              previousEmail: currentUser.email,
              emailChangeRequestedAt: Date.now()
            });
            showMessage(t("emailChangeRestricted"), "error");
          } catch (dbErr) {
            console.error("Database update failed:", dbErr);
            showMessage(t("emailChangeFailed"), "error");
          }
          setEmailForm({ newEmail: "", currentPassword: "" });
          return;
        }
        throw updateErr;
      }
    } catch (err) {
      console.error("Email update error:", err);
      let errorMessage = err.message || t("emailUpdateError");
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        errorMessage = t("passwordIncorrect");
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = t("emailInUse");
      } else if (err.code === "auth/requires-recent-login") {
        errorMessage = t("recentLoginRequired");
      } else if (err.code === "auth/operation-not-allowed") {
        errorMessage = t("emailEnumProtection");
      }
      showMessage(errorMessage, "error");
    } finally {
      setSavingEmail(false);
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) return showMessage(t("loginRequired"), "error");
    const { currentPassword, newPassword, repeatNewPassword } = passwordForm;
    if (!currentPassword) {
      showMessage(t("enterCurrentPassword"), "error");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      showMessage(t("passwordTooShort"), "error");
      return;
    }
    if (newPassword !== repeatNewPassword) {
      showMessage(t("passwordsDontMatch"), "error");
      return;
    }
    if (!currentUser.email) {
      showMessage(t("passwordChangeNotAvailable"), "error");
      return;
    }
    setSavingPassword(true);
    try {
      const cred = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, cred);
      await updatePassword(currentUser, newPassword);
      await currentUser.reload();
      setUser(auth.currentUser);
      showMessage(t("passwordUpdateSuccess"), "success");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: ""
      });
    } catch (err) {
      showMessage(t("passwordUpdateError") + " " + err.message, "error");
    } finally {
      setSavingPassword(false);
    }
  };
  const getSignupRecaptcha = () => {
    if (window.signupRecaptchaVerifier) return window.signupRecaptchaVerifier;
    window.signupRecaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-signup",
      { size: "invisible" }
    );
    return window.signupRecaptchaVerifier;
  };
  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone = (s) => !!s && s.replace(/\D/g, "").length >= 8 && s.replace(/\D/g, "").length <= 16;
  useEffect(() => {
    if (!accountPhone) return;
    setForm((f) => ({ ...f, contact: accountPhone }));
  }, [accountPhone]);
  const handleImageUpload = (e, isEditOverride = null) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const isEdit = isEditOverride !== null ? isEditOverride : !!editingListing;
    const currentImages = isEdit ? (editForm == null ? void 0 : editForm.images) || [] : form.images || [];
    if (currentImages.length + files.length > 4) {
      showMessage(t("maxImagesError") || "Maximum 4 images allowed", "error");
      return;
    }
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        var _a3;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          if (isEdit) {
            setEditForm((prev) => {
              const newImages = [...prev.images || [], dataUrl];
              return {
                ...prev,
                images: newImages,
                imagePreview: newImages[0]
                // Set first image as preview
              };
            });
          } else {
            setForm((prev) => {
              const newImages = [...prev.images || [], dataUrl];
              return {
                ...prev,
                images: newImages,
                imagePreview: newImages[0]
                // Set first image as preview
              };
            });
          }
        };
        img.src = (_a3 = ev.target) == null ? void 0 : _a3.result;
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };
  const handleRemoveImage = (index, isEdit = false) => {
    if (isEdit) {
      setEditForm((prev) => {
        const newImages = [...prev.images || []];
        newImages.splice(index, 1);
        return {
          ...prev,
          images: newImages,
          imagePreview: newImages.length > 0 ? newImages[0] : null
        };
      });
    } else {
      setForm((prev) => {
        const newImages = [...prev.images || []];
        newImages.splice(index, 1);
        return {
          ...prev,
          images: newImages,
          imagePreview: newImages.length > 0 ? newImages[0] : null
        };
      });
    }
  };
  async function createListingInFirebase(obj) {
    const listingId = obj.id || "lst_" + Date.now();
    const listingData = {
      ...obj,
      id: listingId,
      userId: (user == null ? void 0 : user.uid) || null,
      userEmail: (user == null ? void 0 : user.email) || null,
      createdAt: Date.now(),
      expiresAt: Date.now() + parseInt(obj.plan) * 30 * 24 * 60 * 60 * 1e3
    };
    await set(ref(db, `listings/${listingId}`), listingData);
    return listingId;
  }
  async function deleteListing(listingId) {
    try {
      await remove(ref(db, `listings/${listingId}`));
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const finalLocation = buildLocationString(form.locationCity, form.locationExtra);
    const phoneForListing = accountPhone || form.contact;
    const requiredOk = form.name && form.category && finalLocation && form.description && phoneForListing;
    if (!requiredOk) return showMessage(t("fillAllFields"), "error");
    if (!phoneForListing) {
      return showMessage(t("addPhoneInAccountSettings"), "error");
    }
    const normalizedContact = normalizePhoneForStorage(phoneForListing);
    if (!validatePhone(normalizedContact)) return showMessage(t("enterValidPhone"), "error");
    const offerpriceStr = formatOfferPrice(form.offerMin, form.offerMax, form.offerCurrency);
    setLoading(true);
    setMessage({ text: "", type: "info" });
    try {
      const planId = form.plan || "1";
      const selectedPlan = PLANS.find((p) => p.id === planId) || PLANS[0];
      const listingId = await createListingInFirebase({
        ...form,
        category: categories.find((c) => t(c) === form.category) ? categories.find((c) => t(c) === form.category) : form.category,
        contact: normalizedContact,
        location: finalLocation,
        locationCity: form.locationCity,
        locationExtra: form.locationExtra,
        plan: planId,
        offerprice: offerpriceStr || "",
        status: "unpaid",
        // Wait for payment
        pricePaid: 0,
        price: selectedPlan.priceVal
      });
      try {
        const res = await fetch(`${API_BASE}/api/create-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            listingId,
            type: "create",
            customerEmail: user == null ? void 0 : user.email,
            customerName: (userProfile == null ? void 0 : userProfile.name) || (user == null ? void 0 : user.displayName),
            plan: planId
          })
        });
        const data = await res.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
          return;
        } else {
          throw new Error("Payment initialization failed");
        }
      } catch (paymentErr) {
        console.error("Payment error:", paymentErr);
        showMessage("Listing saved but payment failed. Please try again from My Listings.", "error");
      }
      setShowPostForm(false);
      setForm({
        step: 1,
        name: "",
        category: "",
        locationCity: "",
        locationExtra: "",
        locationData: null,
        description: "",
        contact: "",
        offerMin: "",
        offerMax: "",
        offerCurrency: "EUR",
        offerprice: "",
        tags: "",
        socialLink: "",
        imagePreview: null,
        images: []
      });
    } catch (err) {
      console.error(err);
      showMessage(t("error") + " " + err.message, "error");
    } finally {
      setLoading(false);
    }
  }
  const openEdit = useCallback((listing) => {
    const rawLocation = (listing.location || "").trim();
    const guessedCity = listing.locationCity || MK_CITIES.find((city) => rawLocation.startsWith(city)) || "";
    const guessedExtra = listing.locationExtra || (guessedCity ? rawLocation.replace(guessedCity, "").replace(/^\s*-\s*/, "").trim() : "");
    const lockedContact = normalizePhoneForStorage(
      listing.contact || accountPhone || (userProfile == null ? void 0 : userProfile.phone) || ""
    );
    setEditingListing(listing);
    setEditForm({
      name: listing.name || "",
      category: listing.category || "",
      locationCity: guessedCity,
      locationExtra: guessedExtra,
      locationData: listing.locationData || null,
      description: listing.description || "",
      contact: lockedContact,
      plan: listing.plan || "1",
      price: listing.price || 0,
      // plan price
      offerprice: listing.offerprice || "",
      // business offer price (already formatted)
      tags: listing.tags || "",
      socialLink: listing.socialLink || "",
      imagePreview: listing.imagePreview || null,
      images: listing.images || (listing.imagePreview ? [listing.imagePreview] : [])
    });
  }, [accountPhone, userProfile]);
  const saveEdit = async () => {
    if (!editingListing || !editForm) return;
    const finalLocation = buildLocationString(editForm.locationCity, editForm.locationExtra);
    const phoneForListing = editForm.contact || accountPhone || editingListing.contact;
    if (!phoneForListing) return showMessage(t("addPhoneInAccountSettings"), "error");
    if (!editForm.name || !editForm.category || !editForm.locationCity || !editForm.description)
      return showMessage(t("fillAllFields"), "error");
    const normalizedContact = normalizePhoneForStorage(phoneForListing);
    if (!validatePhone(normalizedContact)) return showMessage(t("enterValidPhone"), "error");
    const updates = {
      name: stripDangerous(editForm.name),
      category: editForm.category,
      location: finalLocation,
      locationCity: editForm.locationCity,
      locationExtra: editForm.locationExtra,
      locationData: editForm.locationData || null,
      description: stripDangerous(editForm.description),
      contact: normalizedContact,
      offerprice: editForm.offerprice || "",
      // update only business price string
      tags: stripDangerous(editForm.tags || ""),
      socialLink: stripDangerous(editForm.socialLink || ""),
      imagePreview: editForm.imagePreview || null,
      images: editForm.images || []
    };
    await update(ref(db, `listings/${editingListing.id}`), updates);
    showMessage(t("saveSuccess"), "success");
    setEditingListing(null);
    setEditForm(null);
  };
  const confirmDelete = useCallback(async (id) => {
    if (!window.confirm(t("confirmDelete"))) return;
    await deleteListing(id);
    showMessage(t("listingDeleted"), "success");
  }, [showMessage]);
  const verifiedListings = useMemo(() => {
    return deferredListings.filter((l) => l.status === "verified" && (!l.expiresAt || l.expiresAt > Date.now()));
  }, [deferredListings]);
  useMemo(
    () => Array.from(new Set(verifiedListings.map((l) => (l.location || "").trim()).filter(Boolean))),
    [verifiedListings]
  );
  const feedbackAverages = useMemo(() => {
    const map = {};
    deferredListings.forEach((l) => {
      map[l.id] = {
        count: l.feedbackCount || 0,
        avg: l.avgRating || null
      };
    });
    return map;
  }, [deferredListings]);
  const filtered = useMemo(() => {
    let arr = [...verifiedListings];
    if (deferredQ.trim()) {
      const term = deferredQ.trim().toLowerCase();
      arr = arr.filter(
        (l) => (l.name || "").toLowerCase().includes(term) || (l.description || "").toLowerCase().includes(term)
      );
    }
    if (catFilter) arr = arr.filter((l) => (t(l.category) || l.category) === catFilter);
    if (locFilter) arr = arr.filter((l) => l.location === locFilter);
    if (sortBy === "topRated") {
      arr.sort((a, b) => {
        const aStats = feedbackAverages[a.id] || {};
        const bStats = feedbackAverages[b.id] || {};
        const bAvg = bStats.avg ?? -1;
        const aAvg = aStats.avg ?? -1;
        if (bAvg !== aAvg) return bAvg - aAvg;
        const bCount = bStats.count || 0;
        const aCount = aStats.count || 0;
        if (bCount !== aCount) return bCount - aCount;
        return (b.createdAt || 0) - (a.createdAt || 0);
      });
    }
    if (sortBy === "newest") arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    if (sortBy === "expiring") arr.sort((a, b) => (a.expiresAt || 0) - (b.expiresAt || 0));
    if (sortBy === "az") arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    return arr;
  }, [verifiedListings, deferredQ, catFilter, locFilter, sortBy, feedbackAverages, t]);
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / pageSize)),
    [filtered.length, pageSize]
  );
  const pagedFiltered = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);
  const getDaysUntilExpiry = useCallback((expiresAt) => {
    if (!expiresAt) return null;
    const now = Date.now();
    const diff = expiresAt - now;
    const days = Math.ceil(diff / (1e3 * 60 * 60 * 24));
    return days;
  }, []);
  const myListings = useMemo(() => {
    let filtered2 = [...myListingsRaw];
    if (myListingsStatusFilter === "verified") {
      filtered2 = filtered2.filter((l) => l.status === "verified");
    } else if (myListingsStatusFilter === "pending") {
      filtered2 = filtered2.filter((l) => l.status !== "verified");
    }
    if (myListingsExpiryFilter === "expiring") {
      filtered2 = filtered2.filter((l) => {
        const days = getDaysUntilExpiry(l.expiresAt);
        return days !== null && days > 0 && days <= 7;
      });
    } else if (myListingsExpiryFilter === "expired") {
      filtered2 = filtered2.filter((l) => {
        const days = getDaysUntilExpiry(l.expiresAt);
        return days !== null && days <= 0;
      });
    } else if (myListingsExpiryFilter === "active") {
      filtered2 = filtered2.filter((l) => {
        const days = getDaysUntilExpiry(l.expiresAt);
        return days === null || days > 0;
      });
    }
    if (deferredMyListingsSearch.trim()) {
      const term = deferredMyListingsSearch.trim().toLowerCase();
      filtered2 = filtered2.filter(
        (l) => (l.name || "").toLowerCase().includes(term) || (l.description || "").toLowerCase().includes(term) || (l.location || "").toLowerCase().includes(term) || (l.category || "").toLowerCase().includes(term)
      );
    }
    if (myListingsSort === "newest") {
      filtered2.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (myListingsSort === "oldest") {
      filtered2.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    } else if (myListingsSort === "expiring") {
      filtered2.sort((a, b) => {
        const aDays = getDaysUntilExpiry(a.expiresAt);
        const bDays = getDaysUntilExpiry(b.expiresAt);
        if (aDays === null && bDays === null) return 0;
        if (aDays === null) return 1;
        if (bDays === null) return -1;
        return aDays - bDays;
      });
    } else if (myListingsSort === "az") {
      filtered2.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
    return filtered2;
  }, [myListingsRaw, myListingsStatusFilter, myListingsExpiryFilter, myListingsSort, deferredMyListingsSearch]);
  const myVerifiedCount = useMemo(
    () => myListingsRaw.filter((l) => l.status === "verified").length,
    [myListingsRaw]
  );
  const myPendingCount = useMemo(
    () => myListingsRaw.filter((l) => l.status !== "verified").length,
    [myListingsRaw]
  );
  const getListingStats = useCallback(
    (listing) => {
      const stats = feedbackAverages[listing.id] || {};
      const feedbackCount = listing.feedbackCount ?? stats.count ?? 0;
      const avgRating = listing.avgRating ?? stats.avg ?? 0;
      const engagement = feedbackCount + (favorites.includes(listing.id) ? 1 : 0);
      return { feedbackCount, avgRating, engagement };
    },
    [favorites, feedbackAverages]
  );
  const toggleFav = useCallback((id) => setFavorites((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]), []);
  const feedbackStats = useMemo(() => {
    var _a3;
    if (!selectedListing) return { entries: [], avg: null, count: 0 };
    const stats = feedbackAverages[selectedListing.id];
    return {
      entries: ((_a3 = feedbackStore[selectedListing.id]) == null ? void 0 : _a3.entries) || [],
      avg: (stats == null ? void 0 : stats.avg) ?? null,
      count: (stats == null ? void 0 : stats.count) ?? 0
    };
  }, [feedbackAverages, selectedListing, feedbackStore]);
  useEffect(() => {
    var _a3, _b3;
    if (!selectedListing) return;
    const entries = ((_a3 = feedbackStore[selectedListing.id]) == null ? void 0 : _a3.entries) || [];
    const lastRating = ((_b3 = entries[0]) == null ? void 0 : _b3.rating) || 4;
    setFeedbackDraft({ rating: lastRating, comment: "" });
  }, [feedbackStore, selectedListing]);
  const handleFeedbackSubmit = useCallback(async (listingId) => {
    if (!listingId) return;
    const rating = Math.min(Math.max(Number(feedbackDraft.rating) || 0, 1), 5);
    const comment = (feedbackDraft.comment || "").trim();
    if (!comment) {
      showMessage(t("commentEmptyError"), "error");
      return;
    }
    let authorName = user == null ? void 0 : user.displayName;
    if (!authorName && (user == null ? void 0 : user.uid)) {
      try {
        const snapshot = await get(ref(db, `users/${user.uid}/name`));
        if (snapshot.exists()) {
          authorName = snapshot.val();
        }
      } catch (e) {
        console.error("Error fetching user name for feedback:", e);
      }
    }
    const entry = {
      rating,
      comment,
      createdAt: Date.now(),
      userId: (user == null ? void 0 : user.uid) || null,
      author: authorName || ((user == null ? void 0 : user.email) ? user.email.split("@")[0] : "User")
    };
    setFeedbackSaving(true);
    try {
      await push(ref(db, `feedback/${listingId}`), entry);
      const listing = listings.find((l) => l.id === listingId);
      if (listing) {
        const currentCount = listing.feedbackCount || 0;
        const currentAvg = listing.avgRating || 0;
        const newCount = currentCount + 1;
        const newAvg = Number(((currentAvg * currentCount + rating) / newCount).toFixed(1));
        await update(ref(db, `listings/${listingId}`), {
          feedbackCount: newCount,
          avgRating: newAvg
        });
        const ownerEmail = listing.userEmail;
        if (ownerEmail) {
          const subject = `${t("reviewNotificationSubject")}: ${listing.name}`;
          const text = `${t("reviewNotificationText")}

${t("reviewNotificationComment")}: ${comment}

${t("reviewNotificationCheck")}: ${window.location.origin}?listing=${listingId}`;
          try {
            await sendEmail(ownerEmail, subject, text);
          } catch (err) {
            console.error("Failed to send feedback notification:", err);
          }
        }
      }
      setFeedbackDraft((d) => ({ ...d, comment: "" }));
      showMessage(t("feedbackSaved"), "success");
    } catch (error) {
      console.error(error);
      showMessage(t("feedbackSaveError"), "error");
    } finally {
      setFeedbackSaving(false);
    }
  }, [feedbackDraft, user, t, listings, showMessage]);
  const handleSelectListing = useCallback((l) => {
    setSelectedListing(l);
    setModalImageIndex(0);
    const url = new URL(window.location.href);
    url.searchParams.set("listing", l.id);
    window.history.replaceState({}, "", url.toString());
  }, []);
  const handleOpenEdit = useCallback((l) => {
    openEdit(l);
  }, [openEdit]);
  const handleConfirmDelete = useCallback((id) => {
    confirmDelete(id);
  }, [confirmDelete]);
  const handleShareListing = useCallback((listing) => {
    const url = `${window.location.origin}?listing=${encodeURIComponent(listing.id)}`;
    const text = `${listing.name || ""} • ${listing.location || ""} – ${t("shareText")}`;
    if (navigator.share) {
      navigator.share({
        title: listing.name || t("appName"),
        text,
        url
      }).catch(() => {
      });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showMessage(t("shareCopied"), "success");
    } else {
      showMessage(t("shareNotSupported"), "error");
    }
  }, [t, showMessage]);
  const handleStartExtendFlow = useCallback((listing) => {
    setExtendTarget(listing);
    setSelectedExtendPlan("1");
    setExtendModalOpen(true);
  }, []);
  const handleProceedExtend = async () => {
    if (!extendTarget) return;
    const listing = extendTarget;
    const planId = selectedExtendPlan;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/create-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          type: "extend",
          customerEmail: user == null ? void 0 : user.email,
          customerName: (userProfile == null ? void 0 : userProfile.name) || (user == null ? void 0 : user.displayName),
          plan: planId
        })
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error(err);
      showMessage(t("paymentError") || "Payment initialization failed", "error");
      setLoading(false);
    }
  };
  const onLogout = useCallback(async () => {
    await signOut(auth);
    showMessage(t("signedOut"), "success");
    if (selectedTab === "myListings" || selectedTab === "account") {
      setSelectedTab("main");
    }
  }, [t, selectedTab, showMessage]);
  const onLogin = useCallback(() => {
    setShowAuthModal(true);
    setMessage({ text: "", type: "info" });
  }, []);
  const onMenuOpen = useCallback(() => setSidebarOpen(true), []);
  const onSidebarSelect = useCallback((tab) => {
    setSelectedTab(tab);
    setSidebarOpen(false);
  }, [setSelectedTab]);
  const handleSidebarLogout = useCallback(async () => {
    await signOut(auth);
    showMessage(t("signedOut"), "success");
    setSidebarOpen(false);
    if (selectedTab === "myListings" || selectedTab === "account") {
      setSelectedTab("main");
    }
  }, [t, selectedTab, showMessage]);
  const handleSidebarLogin = useCallback(() => {
    setShowAuthModal(true);
    setMessage({ text: "", type: "info" });
    setSidebarOpen(false);
  }, []);
  const onSidebarClose = useCallback(() => setSidebarOpen(false), []);
  const previewLocation = buildLocationString(form.locationCity, form.locationExtra);
  const editLocationPreview = editForm ? buildLocationString(editForm.locationCity, editForm.locationExtra) : "";
  const activeListingCount = useMemo(() => deferredListings.length, [deferredListings]);
  const verifiedListingCount = useMemo(
    () => deferredListings.filter((l) => l.status === "verified").length,
    [deferredListings]
  );
  const phoneVerifiedCount = useMemo(() => deferredListings.filter((l) => l.phoneVerified).length, [deferredListings]);
  const primaryNav = useMemo(
    () => [
      { id: "main", label: t("homepage"), icon: "🏠" },
      { id: "allListings", label: t("explore"), icon: "🧭", badge: verifiedListings.length },
      ...user ? [
        { id: "myListings", label: t("myListings"), icon: "📂", badge: myListingsRaw.length },
        { id: "account", label: t("account"), icon: "👤" }
      ] : []
    ],
    [t, verifiedListings.length, myListingsRaw.length, user]
  );
  const currentSectionLabel = useMemo(() => {
    if (selectedTab === "myListings") return t("myListings");
    if (selectedTab === "account") return t("account");
    if (selectedTab === "allListings") return t("explore");
    return t("dashboard");
  }, [selectedTab, t]);
  const authModeTabs = useMemo(
    () => [
      { id: "login", label: t("login") },
      { id: "signup", label: t("signup") }
    ],
    [t]
  );
  const authMethodTabs = useMemo(
    () => [
      { id: "email", label: t("emailTab"), icon: "✉️" },
      { id: "phone", label: t("signInWithPhone"), icon: "📱" }
    ],
    [t]
  );
  const handleAuthModeChange = (mode) => {
    setAuthMode(mode);
    setConfirmationResult(null);
    if (mode === "login") setAuthTab("email");
  };
  const handleAuthTabChange = (tab) => {
    setAuthTab(tab);
    setConfirmationResult(null);
  };
  const canonicalUrl = typeof window !== "undefined" ? window.location.href : "https://bizcall.mk";
  const seoTitle = t("seoTitle");
  const seoDescription = t("seoDescription");
  const seoKeywords = t("seoKeywords");
  const ogImage = "/og-image.png";
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BizCall",
    "url": canonicalUrl
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      HeadManager,
      {
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords,
        canonical: canonicalUrl,
        image: ogImage,
        jsonLd: jsonLdData
      }
    ),
    message.text && /* @__PURE__ */ jsx("div", { className: `notification ${message.type}`, children: message.text }),
    /* @__PURE__ */ jsxs("div", { className: "app", children: [
      /* @__PURE__ */ jsx(
        Header,
        {
          t,
          logo,
          primaryNav,
          selectedTab,
          setSelectedTab,
          lang,
          setLang,
          user,
          onLogout,
          onLogin,
          onMenuOpen
        }
      ),
      selectedTab === "main" && /* @__PURE__ */ jsx(
        HomeTab,
        {
          t,
          setShowPostForm,
          setForm,
          setSelectedTab,
          categoryIcons,
          mkSpotlightCities,
          activeListingCount,
          verifiedListingCount,
          verifiedListings,
          favorites,
          toggleFav,
          handleSelectListing,
          handleShareListing,
          showMessage,
          getDescriptionPreview,
          getListingStats,
          ListingCard,
          setCatFilter,
          setLocFilter
        }
      ),
      /* @__PURE__ */ jsx(AnimatePresence, { children: sidebarOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "sidebar-overlay",
            onClick: () => setSidebarOpen(false),
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 }
          }
        ),
        /* @__PURE__ */ jsx(
          motion.aside,
          {
            className: "sidebar mobile-drawer",
            initial: { x: "-100%" },
            animate: { x: 0 },
            exit: { x: "-100%" },
            transition: { type: "tween", duration: 0.3 },
            style: { touchAction: "none", WebkitOverflowScrolling: "touch" },
            children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "sidebar-loading", children: "..." }), children: /* @__PURE__ */ jsx(
              Sidebar,
              {
                t,
                selected: selectedTab,
                onSelect: onSidebarSelect,
                onLogout: handleSidebarLogout,
                onLogin: handleSidebarLogin,
                onClose: onSidebarClose,
                user
              }
            ) })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "container", children: selectedTab !== "main" ? /* @__PURE__ */ jsx("div", { className: "dashboard", children: /* @__PURE__ */ jsx("main", { className: "dashboard-content", children: /* @__PURE__ */ jsxs("div", { className: "panel", children: [
        /* @__PURE__ */ jsxs("div", { className: "dashboard-topbar", children: [
          /* @__PURE__ */ jsxs("div", { className: "dashboard-meta", children: [
            /* @__PURE__ */ jsx("p", { className: "eyebrow subtle", children: t("dashboard") }),
            friendlyName && /* @__PURE__ */ jsxs("p", { className: "dashboard-greeting", children: [
              /* @__PURE__ */ jsx("span", { className: "wave", children: "👋" }),
              " ",
              t("hello") || "Hello",
              ", ",
              /* @__PURE__ */ jsx("span", { className: "highlight-name", children: friendlyName })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "dashboard-heading", children: t("manageListings") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "topbar-tabs", children: [
            /* @__PURE__ */ jsx("span", { className: "pill current-view", children: currentSectionLabel }),
            selectedTab !== "allListings" && /* @__PURE__ */ jsxs(
              "button",
              {
                className: "btn btn-ghost small",
                type: "button",
                onClick: () => setSelectedTab("allListings"),
                children: [
                  "🌍 ",
                  t("explore")
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "tab-panel unified-panel", children: [
          selectedTab === "myListings" && /* @__PURE__ */ jsxs("div", { className: "section my-listings-section", children: [
            /* @__PURE__ */ jsxs("div", { className: "section-header-row stacked-mobile", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h2", { className: "section-title-inner", children: [
                  "📁 ",
                  t("myListings")
                ] }),
                /* @__PURE__ */ jsx("p", { className: "section-subtitle-small", children: t("myListingsHint") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pill-row", children: [
                /* @__PURE__ */ jsxs("span", { className: "badge count", children: [
                  myListings.length,
                  " ",
                  myListings.length === 1 ? t("listing") : t("listingsLabel")
                ] }),
                myVerifiedCount > 0 && /* @__PURE__ */ jsxs("span", { className: "badge success", children: [
                  "✅ ",
                  myVerifiedCount,
                  " ",
                  t("verified")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "my-listings-toolbar", children: [
              /* @__PURE__ */ jsxs("div", { className: "my-listings-stats", children: [
                /* @__PURE__ */ jsxs("div", { className: "stat-chip positive", children: [
                  /* @__PURE__ */ jsxs("span", { className: "stat-label", children: [
                    "✅ ",
                    t("verified")
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "stat-value", children: myVerifiedCount })
                ] }),
                myPendingCount > 0 && /* @__PURE__ */ jsxs("div", { className: "stat-chip subtle", children: [
                  /* @__PURE__ */ jsxs("span", { className: "stat-label", children: [
                    "⏳ ",
                    t("pending")
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "stat-value", children: myPendingCount })
                ] }),
                (() => {
                  const expiringSoon = myListingsRaw.filter((l) => {
                    const days = getDaysUntilExpiry(l.expiresAt);
                    return days !== null && days > 0 && days <= 7;
                  }).length;
                  return expiringSoon > 0 ? /* @__PURE__ */ jsxs("div", { className: "stat-chip warning", children: [
                    /* @__PURE__ */ jsxs("span", { className: "stat-label", children: [
                      "⚠️ ",
                      t("expiringSoon")
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "stat-value", children: expiringSoon })
                  ] }) : null;
                })(),
                (() => {
                  const totalReviews = myListingsRaw.reduce((sum, l) => {
                    const stats = getListingStats(l);
                    return sum + (stats.feedbackCount || 0);
                  }, 0);
                  return totalReviews > 0 ? /* @__PURE__ */ jsxs("div", { className: "stat-chip info", children: [
                    /* @__PURE__ */ jsxs("span", { className: "stat-label", children: [
                      "💬 ",
                      t("reviewsLabel")
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "stat-value", children: totalReviews })
                  ] }) : null;
                })()
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "my-listings-actions", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    className: "btn btn-ghost filter-toggle-btn",
                    onClick: () => setFiltersOpen((v) => !v),
                    "aria-expanded": filtersOpen,
                    children: [
                      filtersOpen ? "✕ " : "🔍 ",
                      t("filters")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "btn btn-ghost small",
                    onClick: () => setSelectedTab("allListings"),
                    type: "button",
                    children: [
                      "🔍 ",
                      t("explore")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "btn small",
                    onClick: () => {
                      setSelectedTab("myListings");
                      setShowPostForm(true);
                    },
                    type: "button",
                    children: [
                      "➕ ",
                      t("submitListing")
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              Filtersheet,
              {
                t,
                filtersOpen,
                setFiltersOpen,
                q: myListingsSearch,
                setQ: setMyListingsSearch,
                sortBy: myListingsSort,
                setSortBy: setMyListingsSort,
                statusFilter: myListingsStatusFilter,
                setStatusFilter: setMyListingsStatusFilter,
                expiryFilter: myListingsExpiryFilter,
                setExpiryFilter: setMyListingsExpiryFilter
              }
            ),
            (myListingsSearch || myListingsStatusFilter !== "all" || myListingsExpiryFilter !== "all") && /* @__PURE__ */ jsxs("div", { className: "active-filters-bar", children: [
              /* @__PURE__ */ jsxs("span", { className: "active-filters-label", children: [
                t("activeFilters"),
                ":"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "active-filters-chips", children: [
                myListingsSearch && /* @__PURE__ */ jsxs("span", { className: "active-filter-chip", children: [
                  t("search"),
                  ': "',
                  myListingsSearch,
                  '"',
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "filter-chip-remove",
                      onClick: () => setMyListingsSearch(""),
                      children: "✕"
                    }
                  )
                ] }),
                myListingsStatusFilter !== "all" && /* @__PURE__ */ jsxs("span", { className: "active-filter-chip", children: [
                  t("status"),
                  ": ",
                  t(myListingsStatusFilter) || myListingsStatusFilter,
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "filter-chip-remove",
                      onClick: () => setMyListingsStatusFilter("all"),
                      children: "✕"
                    }
                  )
                ] }),
                myListingsExpiryFilter !== "all" && /* @__PURE__ */ jsxs("span", { className: "active-filter-chip", children: [
                  t("expiry"),
                  ": ",
                  t(myListingsExpiryFilter) || myListingsExpiryFilter,
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "filter-chip-remove",
                      onClick: () => setMyListingsExpiryFilter("all"),
                      children: "✕"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-clear-all-filters",
                    onClick: () => {
                      setMyListingsSearch("");
                      setMyListingsStatusFilter("all");
                      setMyListingsExpiryFilter("all");
                      setMyListingsSort("newest");
                    },
                    children: t("clearAll")
                  }
                )
              ] })
            ] }),
            myListings.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "empty my-listings-empty", children: [
              /* @__PURE__ */ jsx("div", { className: "empty-icon", children: "📭" }),
              /* @__PURE__ */ jsx("p", { className: "empty-text", children: myListingsRaw.length === 0 ? t("noListingsYet") : myListingsSearch || myListingsStatusFilter !== "all" || myListingsExpiryFilter !== "all" ? t("noListingsMatchFilters") : t("noListingsYet") }),
              myListingsRaw.length > 0 && (myListingsSearch || myListingsStatusFilter !== "all" || myListingsExpiryFilter !== "all") && /* @__PURE__ */ jsx(
                "button",
                {
                  className: "btn small",
                  onClick: () => {
                    setMyListingsSearch("");
                    setMyListingsStatusFilter("all");
                    setMyListingsExpiryFilter("all");
                  },
                  type: "button",
                  children: t("clearFilters")
                }
              )
            ] }) : /* @__PURE__ */ jsx("div", { className: "listing-grid my-listings-grid responsive-grid", children: myListings.map((l) => /* @__PURE__ */ jsx(
              MyListingCard,
              {
                listing: l,
                t,
                categoryIcons,
                getDaysUntilExpiry,
                getListingStats,
                getDescriptionPreview,
                setSelectedListing: handleSelectListing,
                openEdit: handleOpenEdit,
                startExtendFlow: handleStartExtendFlow,
                showMessage,
                handleShareListing,
                confirmDelete: handleConfirmDelete
              },
              l.id
            )) })
          ] }),
          selectedTab === "account" && /* @__PURE__ */ jsxs("div", { className: "section account-shell", children: [
            /* @__PURE__ */ jsxs("div", { className: "account-header-section", children: [
              /* @__PURE__ */ jsxs("div", { className: "account-header-content", children: [
                /* @__PURE__ */ jsxs("h2", { className: "account-page-title", children: [
                  "👤 ",
                  t("account")
                ] }),
                /* @__PURE__ */ jsx("p", { className: "account-page-subtitle", children: t("accountSubtitle") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "account-header-actions", children: [
                /* @__PURE__ */ jsxs("button", { className: "btn btn-ghost small", onClick: () => setSelectedTab("allListings"), children: [
                  "🧭 ",
                  t("explore")
                ] }),
                /* @__PURE__ */ jsxs("button", { className: "btn small", onClick: () => setShowPostForm(true), children: [
                  "➕ ",
                  t("submitListing")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "account-quick-stats", children: [
              {
                icon: "📁",
                label: t("myListings"),
                value: myListingsRaw.length,
                hint: `${myVerifiedCount} ${t("verified")}`,
                color: "blue"
              },
              {
                icon: "⭐",
                label: t("favorites"),
                value: favorites.length,
                hint: t("reputation"),
                color: "yellow"
              },
              {
                icon: "📅",
                label: t("memberSince"),
                value: ((_a2 = user == null ? void 0 : user.metadata) == null ? void 0 : _a2.creationTime) ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—",
                hint: t("accountSince"),
                color: "purple"
              }
            ].map((stat) => /* @__PURE__ */ jsxs("div", { className: `account-stat-card-enhanced stat-${stat.color}`, children: [
              /* @__PURE__ */ jsx("div", { className: "stat-icon", children: stat.icon }),
              /* @__PURE__ */ jsxs("div", { className: "stat-content", children: [
                /* @__PURE__ */ jsx("p", { className: "stat-label", children: stat.label }),
                /* @__PURE__ */ jsx("p", { className: "stat-value", children: stat.value }),
                stat.hint && /* @__PURE__ */ jsx("p", { className: "stat-note", children: stat.hint })
              ] })
            ] }, stat.label)) }),
            /* @__PURE__ */ jsxs("div", { className: "account-panels", children: [
              /* @__PURE__ */ jsxs("div", { className: "account-column", children: [
                /* @__PURE__ */ jsxs("div", { className: "card account-card-enhanced", children: [
                  /* @__PURE__ */ jsxs("div", { className: "account-card-header", children: [
                    /* @__PURE__ */ jsxs("h3", { className: "account-card-title", children: [
                      "📋 ",
                      t("profileInfo")
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "account-card-subtitle", children: t("accountDetails") })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "account-info-list", children: [
                    /* @__PURE__ */ jsxs("div", { className: "account-info-item", children: [
                      /* @__PURE__ */ jsx("div", { className: "account-info-item-icon", children: "✉️" }),
                      /* @__PURE__ */ jsxs("div", { className: "account-info-item-content", children: [
                        /* @__PURE__ */ jsx("p", { className: "account-info-label", children: t("emailLabel") }),
                        /* @__PURE__ */ jsx("p", { className: "account-info-value", children: (user == null ? void 0 : user.email) || t("unspecified") }),
                        (user == null ? void 0 : user.emailVerified) ? /* @__PURE__ */ jsxs("span", { className: "account-info-badge verified", children: [
                          "✅ ",
                          t("verified")
                        ] }) : /* @__PURE__ */ jsxs("span", { className: "account-info-badge not-verified", children: [
                          "⏳ ",
                          t("pendingVerification")
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "account-info-item", children: [
                      /* @__PURE__ */ jsx("div", { className: "account-info-item-icon", children: "📞" }),
                      /* @__PURE__ */ jsxs("div", { className: "account-info-item-content", children: [
                        /* @__PURE__ */ jsx("p", { className: "account-info-label", children: t("phoneNumber") }),
                        !phoneEditing ? /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx("p", { className: "account-info-value", children: accountPhone || /* @__PURE__ */ jsx("span", { className: "account-info-placeholder", children: t("addPhoneNumber") }) }),
                          /* @__PURE__ */ jsx("button", { className: "btn btn-ghost btn-sm ml-auto", onClick: () => setPhoneEditing(true), children: t("edit") })
                        ] }) : !phoneConfirmationResult ? /* @__PURE__ */ jsxs("form", { className: "account-form-enhanced", onSubmit: handleChangePhone, children: [
                          /* @__PURE__ */ jsxs("div", { className: "phone-input-group", children: [
                            /* @__PURE__ */ jsx(
                              "select",
                              {
                                value: phoneCountryCode,
                                onChange: (e) => setPhoneCountryCode(e.target.value),
                                className: "phone-country",
                                children: countryCodes.map((c) => /* @__PURE__ */ jsx("option", { value: c.code, children: c.code }, c.code))
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: "tel",
                                className: "phone-number",
                                value: phoneNumber,
                                onChange: (e) => setPhoneNumber(e.target.value),
                                placeholder: t("phoneNumber")
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "account-form-field", children: [
                            /* @__PURE__ */ jsx("label", { className: "account-form-label", children: t("currentPassword") }),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: "password",
                                className: "input account-form-input",
                                value: passwordForm.currentPassword,
                                onChange: (e) => setPasswordForm((f) => ({ ...f, currentPassword: e.target.value })),
                                placeholder: t("currentPasswordPlaceholder")
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "account-form-actions", children: [
                            /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-ghost small", onClick: () => {
                              setPhoneEditing(false);
                              setPhoneConfirmationResult(null);
                            }, children: t("cancel") }),
                            /* @__PURE__ */ jsx("button", { type: "submit", className: "btn small", disabled: savingPhone, children: savingPhone ? t("sendingCode") : t("savePhone") })
                          ] }),
                          /* @__PURE__ */ jsx("div", { id: "recaptcha-container-account" })
                        ] }) : /* @__PURE__ */ jsxs("form", { className: "account-form-enhanced", onSubmit: handleVerifyPhoneCode, children: [
                          /* @__PURE__ */ jsxs("div", { className: "account-form-field", children: [
                            /* @__PURE__ */ jsx("label", { className: "account-form-label", children: t("enterCode") }),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: "text",
                                className: "input account-form-input",
                                value: phoneVerificationCode,
                                onChange: (e) => setPhoneVerificationCode(e.target.value.replace(/\D/g, "")),
                                placeholder: t("enterCode"),
                                maxLength: "6"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "account-form-actions", children: [
                            /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-ghost small", onClick: () => {
                              setPhoneConfirmationResult(null);
                              setPhoneVerificationCode("");
                            }, children: t("back") }),
                            /* @__PURE__ */ jsx("button", { type: "submit", className: "btn small", disabled: savingPhone, children: savingPhone ? t("verifying") : t("verifyCode") })
                          ] })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "account-info-item", children: [
                      /* @__PURE__ */ jsx("div", { className: "account-info-item-icon", children: "📅" }),
                      /* @__PURE__ */ jsxs("div", { className: "account-info-item-content", children: [
                        /* @__PURE__ */ jsx("p", { className: "account-info-label", children: t("accountSince") }),
                        /* @__PURE__ */ jsx("p", { className: "account-info-value", children: ((_b2 = user == null ? void 0 : user.metadata) == null ? void 0 : _b2.creationTime) ? new Date(user.metadata.creationTime).toLocaleDateString(lang === "sq" ? "sq-AL" : lang === "mk" ? "mk-MK" : "en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        }) : "—" })
                      ] })
                    ] })
                  ] }),
                  !(user == null ? void 0 : user.emailVerified) && /* @__PURE__ */ jsxs("div", { className: "account-alert-enhanced", children: [
                    /* @__PURE__ */ jsx("div", { className: "account-alert-icon", children: "⚠️" }),
                    /* @__PURE__ */ jsxs("div", { className: "account-alert-content", children: [
                      /* @__PURE__ */ jsx("p", { className: "account-alert-title", children: t("verifyYourEmail") }),
                      /* @__PURE__ */ jsx("p", { className: "account-alert-sub", children: t("verifyEmailHint") }),
                      /* @__PURE__ */ jsxs("div", { className: "account-alert-actions", children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            className: "btn btn-ghost small",
                            onClick: async () => {
                              try {
                                if (user) {
                                  await sendEmailVerification(user);
                                  showMessage(t("verificationSent"), "success");
                                }
                              } catch (err) {
                                showMessage(t("verificationError") + " " + err.message, "error");
                              }
                            },
                            children: t("resendVerificationEmail")
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            className: "btn small",
                            onClick: () => {
                              setAuthMode("verify");
                              setShowAuthModal(true);
                            },
                            children: t("iVerified")
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "card account-card-enhanced account-quick-links", children: [
                  /* @__PURE__ */ jsx("div", { className: "account-card-header", children: /* @__PURE__ */ jsxs("h3", { className: "account-card-title", children: [
                    "⚡ ",
                    t("quickActions")
                  ] }) }),
                  /* @__PURE__ */ jsxs("div", { className: "account-quick-links-list", children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        className: "account-quick-link-item",
                        onClick: () => setSelectedTab("myListings"),
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "quick-link-icon", children: "📁" }),
                          /* @__PURE__ */ jsxs("div", { className: "quick-link-content", children: [
                            /* @__PURE__ */ jsx("p", { className: "quick-link-title", children: t("myListings") }),
                            /* @__PURE__ */ jsxs("p", { className: "quick-link-subtitle", children: [
                              myListingsRaw.length,
                              " ",
                              t("listingsLabel")
                            ] })
                          ] }),
                          /* @__PURE__ */ jsx("span", { className: "quick-link-arrow", children: "→" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        className: "account-quick-link-item",
                        onClick: () => setSelectedTab("allListings"),
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "quick-link-icon", children: "🔍" }),
                          /* @__PURE__ */ jsxs("div", { className: "quick-link-content", children: [
                            /* @__PURE__ */ jsx("p", { className: "quick-link-title", children: t("explore") }),
                            /* @__PURE__ */ jsx("p", { className: "quick-link-subtitle", children: t("browseListingsHint") })
                          ] }),
                          /* @__PURE__ */ jsx("span", { className: "quick-link-arrow", children: "→" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        className: "account-quick-link-item",
                        onClick: () => setShowPostForm(true),
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "quick-link-icon", children: "➕" }),
                          /* @__PURE__ */ jsxs("div", { className: "quick-link-content", children: [
                            /* @__PURE__ */ jsx("p", { className: "quick-link-title", children: t("submitListing") }),
                            /* @__PURE__ */ jsx("p", { className: "quick-link-subtitle", children: t("createListingHint") })
                          ] }),
                          /* @__PURE__ */ jsx("span", { className: "quick-link-arrow", children: "→" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        className: "account-quick-link-item",
                        onClick: () => setShowTerms(true),
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "quick-link-icon", children: "📜" }),
                          /* @__PURE__ */ jsxs("div", { className: "quick-link-content", children: [
                            /* @__PURE__ */ jsx("p", { className: "quick-link-title", children: t("termsOfService") }),
                            /* @__PURE__ */ jsx("p", { className: "quick-link-subtitle", children: t("readTerms") || "Read our terms" })
                          ] }),
                          /* @__PURE__ */ jsx("span", { className: "quick-link-arrow", children: "→" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        className: "account-quick-link-item",
                        onClick: () => setShowPrivacy(true),
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "quick-link-icon", children: "🔒" }),
                          /* @__PURE__ */ jsxs("div", { className: "quick-link-content", children: [
                            /* @__PURE__ */ jsx("p", { className: "quick-link-title", children: t("privacyPolicy") }),
                            /* @__PURE__ */ jsx("p", { className: "quick-link-subtitle", children: t("readPrivacy") || "Read our privacy policy" })
                          ] }),
                          /* @__PURE__ */ jsx("span", { className: "quick-link-arrow", children: "→" })
                        ]
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "account-column", children: [
                /* @__PURE__ */ jsxs("div", { className: "card account-card-enhanced account-profile-section", children: [
                  /* @__PURE__ */ jsxs("div", { className: "account-card-header", children: [
                    /* @__PURE__ */ jsxs("h3", { className: "account-card-title", children: [
                      "👤 ",
                      t("editProfile")
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "account-card-subtitle", children: t("updateProfileDesc") || "Update your public profile information" })
                  ] }),
                  /* @__PURE__ */ jsxs("form", { className: "account-form-enhanced", onSubmit: handleUpdateProfile, children: [
                    /* @__PURE__ */ jsxs("div", { className: "account-form-field", children: [
                      /* @__PURE__ */ jsx("label", { className: "account-form-label", children: t("displayName") }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          className: "input account-form-input",
                          value: displayName,
                          onChange: (e) => setDisplayName(e.target.value),
                          placeholder: t("displayNamePlaceholder") || "Enter your display name"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "account-form-actions", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn small", disabled: loading, children: loading ? t("saving") : t("updateProfile") }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "card account-card-enhanced account-security-section", children: [
                  /* @__PURE__ */ jsxs("div", { className: "account-card-header", children: [
                    /* @__PURE__ */ jsxs("h3", { className: "account-card-title", children: [
                      "🔒 ",
                      t("securitySettings")
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "account-card-subtitle", children: t("securitySettingsText") })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "account-form-section", children: [
                    /* @__PURE__ */ jsxs("div", { className: "account-form-section-header", children: [
                      /* @__PURE__ */ jsxs("h4", { className: "account-form-section-title", children: [
                        "✉️ ",
                        t("changeEmail")
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "account-form-section-desc", children: t("updateEmailDesc") })
                    ] }),
                    /* @__PURE__ */ jsxs("form", { className: "account-form-enhanced", onSubmit: handleChangeEmail, children: [
                      /* @__PURE__ */ jsxs("div", { className: "account-form-field", children: [
                        /* @__PURE__ */ jsx("label", { className: "account-form-label", children: t("newEmail") }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "email",
                            className: "input account-form-input",
                            value: emailForm.newEmail,
                            onChange: (e) => setEmailForm((f) => ({ ...f, newEmail: e.target.value })),
                            placeholder: t("newEmailPlaceholder")
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "account-form-field", children: [
                        /* @__PURE__ */ jsx("label", { className: "account-form-label", children: t("currentPassword") }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "password",
                            className: "input account-form-input",
                            value: emailForm.currentPassword,
                            onChange: (e) => setEmailForm((f) => ({ ...f, currentPassword: e.target.value })),
                            placeholder: t("currentPasswordPlaceholder")
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "account-form-actions", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn small", disabled: savingEmail, children: savingEmail ? t("saving") : t("saveEmail") }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "account-form-divider" }),
                  /* @__PURE__ */ jsxs("div", { className: "account-form-section", children: [
                    /* @__PURE__ */ jsxs("div", { className: "account-form-section-header", children: [
                      /* @__PURE__ */ jsxs("h4", { className: "account-form-section-title", children: [
                        "🔑 ",
                        t("changePassword")
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "account-form-section-desc", children: t("securitySettings") })
                    ] }),
                    /* @__PURE__ */ jsxs("form", { className: "account-form-enhanced", onSubmit: handleChangePassword, children: [
                      /* @__PURE__ */ jsxs("div", { className: "account-form-field", children: [
                        /* @__PURE__ */ jsx("label", { className: "account-form-label", children: t("currentPassword") }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "password",
                            className: "input account-form-input",
                            value: passwordForm.currentPassword,
                            onChange: (e) => setPasswordForm((f) => ({ ...f, currentPassword: e.target.value })),
                            placeholder: t("currentPasswordPlaceholder")
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "account-form-field", children: [
                        /* @__PURE__ */ jsx("label", { className: "account-form-label", children: t("newPassword") }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "password",
                            className: "input account-form-input",
                            value: passwordForm.newPassword,
                            onChange: (e) => setPasswordForm((f) => ({ ...f, newPassword: e.target.value })),
                            placeholder: t("newPasswordPlaceholder")
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "account-form-field", children: [
                        /* @__PURE__ */ jsx("label", { className: "account-form-label", children: t("repeatNewPassword") }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "password",
                            className: "input account-form-input",
                            value: passwordForm.repeatNewPassword,
                            onChange: (e) => setPasswordForm((f) => ({ ...f, repeatNewPassword: e.target.value })),
                            placeholder: t("repeatNewPasswordPlaceholder")
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "account-form-actions", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn small", disabled: savingPassword, children: savingPassword ? t("saving") : t("savePassword") }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "account-form-divider" }),
                  /* @__PURE__ */ jsxs("div", { className: "account-form-section", children: [
                    /* @__PURE__ */ jsxs("div", { className: "account-form-section-header", children: [
                      /* @__PURE__ */ jsxs("h4", { className: "account-form-section-title", children: [
                        "📧 ",
                        t("emailSubscription")
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "account-form-section-desc", children: t("subscribeToWeeklyEmails") })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "account-form-field subscription-field", children: /* @__PURE__ */ jsxs("label", { className: "subscription-toggle", children: [
                      /* @__PURE__ */ jsxs("div", { className: "subscription-toggle-text", children: [
                        /* @__PURE__ */ jsxs("span", { className: "subscription-toggle-title", children: [
                          "📧 ",
                          t("emailSubscription")
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "subscription-toggle-desc", children: t("subscribeToWeeklyEmails") })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "toggle-switch", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            className: "subscription-checkbox",
                            checked: (userProfile == null ? void 0 : userProfile.subscribedToMarketing) ?? true,
                            onChange: handleSubscriptionChange
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "toggle-slider" })
                      ] })
                    ] }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "card account-card-enhanced account-danger-zone", style: { marginTop: "20px", borderColor: "#fee2e2" }, children: [
                  /* @__PURE__ */ jsxs("div", { className: "account-card-header", children: [
                    /* @__PURE__ */ jsxs("h3", { className: "account-card-title", style: { color: "#ef4444" }, children: [
                      "⚠️ ",
                      t("dangerZone")
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "account-card-subtitle", children: t("dangerZoneDesc") || "Irreversible account actions" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "account-form-section", children: [
                    /* @__PURE__ */ jsx("p", { className: "account-form-section-desc", style: { marginBottom: "16px" }, children: t("deleteAccountWarning") || "Once you delete your account, there is no going back. Please be certain." }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "btn btn-danger full-width",
                        onClick: handleDeleteAccount,
                        style: { backgroundColor: "#ef4444", color: "white" },
                        children: t("deleteAccount")
                      }
                    )
                  ] })
                ] })
              ] })
            ] })
          ] }),
          selectedTab === "allListings" && /* @__PURE__ */ jsx(
            ListingsTab,
            {
              t,
              viewMode,
              setViewMode,
              q,
              setQ,
              catFilter,
              setCatFilter,
              locFilter,
              setLocFilter,
              sortBy,
              setSortBy,
              pagedFiltered,
              page,
              totalPages,
              setPage,
              pageSize,
              setPageSize,
              categoryIcons,
              feedbackAverages,
              setSelectedListing: handleSelectListing,
              filtersOpen,
              setFiltersOpen,
              getDescriptionPreview,
              getListingStats,
              handleShareListing,
              showMessage,
              toggleFav,
              favorites,
              categories,
              allLocations: mkSpotlightCities
            }
          ),
          selectedTab === "allListings" && /* @__PURE__ */ jsx(
            Filtersheet,
            {
              t,
              filtersOpen,
              setFiltersOpen,
              q,
              setQ,
              catFilter,
              setCatFilter,
              locFilter,
              setLocFilter,
              sortBy,
              setSortBy,
              categories,
              categoryIcons,
              allLocations: MK_CITIES
            }
          )
        ] })
      ] }) }) }) : (
        /* Home (Submit + Quick Browse) */
        /* @__PURE__ */ jsxs("div", { className: "main-grid", children: [
          user && user.emailVerified && !showPostForm && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "floating-post-btn",
              onClick: () => {
                setShowPostForm(true);
                setForm((f) => ({ ...f, step: 1 }));
              },
              children: [
                "➕ ",
                t("submitListing")
              ]
            }
          ),
          user && !user.emailVerified && /* @__PURE__ */ jsxs("div", { className: "verify-banner", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: t("verifyYourEmail") }),
              /* @__PURE__ */ jsx("div", { className: "verify-banner-sub", children: t("verifyEmailHint") })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "btn btn-ghost small",
                onClick: () => {
                  setShowAuthModal(true);
                  setAuthMode("verify");
                },
                children: t("verifyYourEmail")
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "home-feature-grid", children: [
            /* @__PURE__ */ jsxs("div", { className: "card feature-card feature-card--primary", children: [
              /* @__PURE__ */ jsxs("div", { className: "feature-card__head", children: [
                /* @__PURE__ */ jsx("p", { className: "eyebrow subtle", children: t("getStartedFast") }),
                /* @__PURE__ */ jsxs("h2", { className: "section-title", children: [
                  "✨ ",
                  t("heroTitle")
                ] }),
                /* @__PURE__ */ jsx("p", { className: "section-subtitle-small", children: t("spotlightHintHero") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "feature-points", children: [
                /* @__PURE__ */ jsxs("div", { className: "feature-point", children: [
                  /* @__PURE__ */ jsx("div", { className: "feature-icon", children: "🚀" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { children: t("submitListing") }),
                    /* @__PURE__ */ jsx("p", { children: t("submitListingDesc") })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "feature-point", children: [
                  /* @__PURE__ */ jsx("div", { className: "feature-icon", children: "🧭" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { children: t("explore") }),
                    /* @__PURE__ */ jsx("p", { children: t("exploreHint") })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "feature-point", children: [
                  /* @__PURE__ */ jsx("div", { className: "feature-icon", children: "🛡️" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { children: t("verified") }),
                    /* @__PURE__ */ jsx("p", { children: t("verifiedHint") })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "feature-actions", children: [
                /* @__PURE__ */ jsxs("button", { className: "btn", onClick: () => setSelectedTab("allListings"), children: [
                  "🔍 ",
                  t("browseMarketplace")
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "btn btn-ghost",
                    onClick: () => {
                      setShowPostForm(true);
                      setForm((f) => ({ ...f, step: 1 }));
                    },
                    children: [
                      "➕ ",
                      t("postService")
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "card feature-card", children: [
              /* @__PURE__ */ jsxs("div", { className: "feature-card__head", children: [
                /* @__PURE__ */ jsx("p", { className: "eyebrow subtle", children: t("verified") }),
                /* @__PURE__ */ jsxs("h3", { className: "section-title-small", children: [
                  "🔒 ",
                  t("trustSafetyLane")
                ] }),
                /* @__PURE__ */ jsx("p", { className: "section-subtitle-small", children: t("trustSafetyLaneDesc") })
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "feature-list", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "✔️ ",
                  t("phoneVerified"),
                  ": ",
                  phoneVerifiedCount
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "✔️ ",
                  t("listingsLabel"),
                  ": ",
                  activeListingCount
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "feature-badges", children: [
                /* @__PURE__ */ jsxs("span", { className: "pill pill-soft", children: [
                  "📬 ",
                  t("homeDigest")
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "pill pill-soft", children: [
                  "📍 ",
                  mkSpotlightCities[0]
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "card feature-card", children: [
              /* @__PURE__ */ jsxs("div", { className: "feature-card__head", children: [
                /* @__PURE__ */ jsxs("h3", { className: "section-title-small", children: [
                  "🧭 ",
                  t("localMissions")
                ] }),
                /* @__PURE__ */ jsx("p", { className: "section-subtitle-small", children: t("localMissionsDesc") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mission-list", children: [
                /* @__PURE__ */ jsxs("div", { className: "mission-item", children: [
                  /* @__PURE__ */ jsx("span", { className: "mission-icon", children: "🌟" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { children: t("updateListing") }),
                    /* @__PURE__ */ jsx("p", { children: t("updateListingHint") })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mission-item", children: [
                  /* @__PURE__ */ jsx("span", { className: "mission-icon", children: "🤝" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { children: t("share") }),
                    /* @__PURE__ */ jsx("p", { children: t("shareLinkHint") })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mission-item", children: [
                  /* @__PURE__ */ jsx("span", { className: "mission-icon", children: "🎯" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { children: t("categorySpotlight") }),
                    /* @__PURE__ */ jsx("p", { children: t("pickCityChip") })
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] })
      ) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: showPostForm && user && user.emailVerified && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "modal-overlay",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setShowPostForm(false),
          children: /* @__PURE__ */ jsxs(
            motion.aside,
            {
              className: "modal post-form-drawer",
              onClick: (e) => e.stopPropagation(),
              initial: { x: "100%", opacity: 0 },
              animate: { x: 0, opacity: 1 },
              exit: { x: "100%", opacity: 0 },
              transition: { type: "tween", duration: 0.3 },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "modal-title", children: [
                    "📝 ",
                    t("submitListing")
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "icon-btn",
                      onClick: () => setShowPostForm(false),
                      "aria-label": t("close"),
                      children: "✕"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "modal-body", style: { maxHeight: "80vh", overflowY: "auto" }, children: user && user.emailVerified ? /* @__PURE__ */ jsxs("section", { className: "card form-section", children: [
                  /* @__PURE__ */ jsxs("h2", { className: "section-title", children: [
                    "📝 ",
                    t("submitListing")
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "plan-grid", style: { marginBottom: 12 }, children: [1, 2, 3].map((s) => /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `plan-option ${form.step === s ? "selected" : ""}`,
                      style: { cursor: "default" },
                      children: /* @__PURE__ */ jsx("div", { className: "plan-content", children: /* @__PURE__ */ jsx("div", { className: "plan-duration", children: s === 1 ? t("stepBasic") : s === 2 ? t("stepDetails") : t("stepPlanPreview") }) })
                    },
                    s
                  )) }),
                  form.step === 1 && /* @__PURE__ */ jsxs(
                    "form",
                    {
                      className: "form",
                      onSubmit: (e) => {
                        e.preventDefault();
                        if (!form.name || !form.category || !form.locationCity)
                          return showMessage(t("fillAllFields"), "error");
                        setForm({ ...form, step: 2 });
                      },
                      children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            className: "input",
                            placeholder: t("name"),
                            value: form.name,
                            onChange: (e) => setForm({
                              ...form,
                              name: stripDangerous(e.target.value).slice(0, 100)
                            }),
                            maxLength: "100",
                            required: true
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          "select",
                          {
                            className: "select category-dropdown",
                            value: form.category,
                            onChange: (e) => setForm({ ...form, category: e.target.value }),
                            required: true,
                            children: [
                              /* @__PURE__ */ jsx("option", { value: "", children: t("selectCategory") }),
                              categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat, children: t(cat) }, cat))
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "location-picker", children: [
                          /* @__PURE__ */ jsxs(
                            "select",
                            {
                              className: "select city-dropdown",
                              value: form.locationCity,
                              onChange: (e) => setForm({
                                ...form,
                                locationCity: e.target.value || ""
                              }),
                              required: true,
                              children: [
                                /* @__PURE__ */ jsx("option", { value: "", children: t("selectCity") }),
                                MK_CITIES.map((city) => /* @__PURE__ */ jsx("option", { value: city, children: city }, city))
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "input",
                            {
                              className: "input",
                              placeholder: t("locationExtra"),
                              maxLength: "100",
                              value: form.locationExtra,
                              onChange: (e) => {
                                const extra = stripDangerous(e.target.value).slice(0, 100);
                                setForm({
                                  ...form,
                                  locationExtra: extra
                                });
                              }
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn btn-ghost small",
                              style: { marginTop: 6 },
                              onClick: () => setShowMapPicker(true),
                              children: t("chooseOnMap")
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "modal-actions", style: { padding: 0, marginTop: 8 }, children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn", children: t("continue") }) })
                      ]
                    }
                  ),
                  form.step === 2 && /* @__PURE__ */ jsxs(
                    "form",
                    {
                      className: "form",
                      onSubmit: (e) => {
                        e.preventDefault();
                        const phoneForListing = accountPhone || form.contact;
                        if (!form.description || !phoneForListing)
                          return showMessage(t("addPhoneInAccount"), "error");
                        if (!validatePhone(phoneForListing))
                          return showMessage(t("enterValidPhone"), "error");
                        setForm({ ...form, contact: phoneForListing, step: 3 });
                      },
                      children: [
                        /* @__PURE__ */ jsx(
                          "textarea",
                          {
                            className: "textarea",
                            placeholder: t("description"),
                            value: form.description,
                            onChange: (e) => setForm({
                              ...form,
                              description: stripDangerous(e.target.value).slice(0, 1e3)
                            }),
                            maxLength: "1000",
                            required: true
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "contact-summary", children: [
                          /* @__PURE__ */ jsxs("div", { className: "contact-summary-main", children: [
                            /* @__PURE__ */ jsx("span", { className: "field-label", children: t("contact") }),
                            /* @__PURE__ */ jsx("p", { className: "contact-number", children: accountPhone || t("addPhoneInAccount") }),
                            /* @__PURE__ */ jsx("p", { className: "contact-hint", children: t("contactAutofill") })
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "contact-summary-actions", children: /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn btn-ghost small",
                              onClick: () => {
                                if (accountPhone) {
                                  setForm((f) => ({ ...f, contact: accountPhone }));
                                  showMessage(t("phoneSynced"), "success");
                                } else {
                                  setSelectedTab("account");
                                  showMessage(t("addPhoneInAccount"), "error");
                                }
                              },
                              children: accountPhone ? t("useAccountPhone") : t("goToAccount")
                            }
                          ) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "offer-price-range", children: [
                          /* @__PURE__ */ jsx("label", { className: "field-label", children: t("offerPriceLabel") }),
                          /* @__PURE__ */ jsxs("div", { className: "offer-range-row", children: [
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                className: "input",
                                type: "number",
                                min: "0",
                                placeholder: t("minPrice"),
                                value: form.offerMin,
                                onChange: (e) => {
                                  const val = e.target.value.replace(/[^\d.,]/g, "");
                                  const updated = { ...form, offerMin: val };
                                  updated.offerprice = formatOfferPrice(
                                    updated.offerMin,
                                    updated.offerMax,
                                    updated.offerCurrency
                                  );
                                  setForm(updated);
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx("span", { children: "—" }),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                className: "input",
                                type: "number",
                                min: "0",
                                placeholder: t("maxPrice"),
                                value: form.offerMax,
                                onChange: (e) => {
                                  const val = e.target.value.replace(/[^\d.,]/g, "");
                                  const updated = { ...form, offerMax: val };
                                  updated.offerprice = formatOfferPrice(
                                    updated.offerMin,
                                    updated.offerMax,
                                    updated.offerCurrency
                                  );
                                  setForm(updated);
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "select",
                              {
                                className: "select",
                                value: form.offerCurrency,
                                onChange: (e) => {
                                  const updated = { ...form, offerCurrency: e.target.value };
                                  updated.offerprice = formatOfferPrice(
                                    updated.offerMin,
                                    updated.offerMax,
                                    updated.offerCurrency
                                  );
                                  setForm(updated);
                                },
                                children: currencyOptions.map((cur) => /* @__PURE__ */ jsx("option", { value: cur, children: cur }, cur))
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            className: "input",
                            placeholder: t("tagsPlaceholder"),
                            value: form.tags,
                            onChange: (e) => setForm({
                              ...form,
                              tags: stripDangerous(e.target.value).slice(0, 64)
                            }),
                            maxLength: "64"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            className: "input",
                            placeholder: t("socialPlaceholder"),
                            value: form.socialLink,
                            onChange: (e) => setForm({
                              ...form,
                              socialLink: stripDangerous(e.target.value).slice(0, 200)
                            }),
                            maxLength: "200"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            className: "input",
                            type: "file",
                            accept: "image/*",
                            multiple: true,
                            onChange: handleImageUpload
                          }
                        ),
                        form.images && form.images.length > 0 && /* @__PURE__ */ jsx("div", { className: "listing-gallery", style: { marginTop: 8 }, children: form.images.map((img, idx) => /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
                          /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: img,
                              alt: `Upload ${idx + 1}`,
                              className: "listing-hero-image",
                              style: { height: "120px" }
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              className: "icon-btn",
                              style: {
                                position: "absolute",
                                top: 4,
                                right: 4,
                                background: "rgba(0,0,0,0.5)",
                                color: "white",
                                borderRadius: "50%",
                                width: 24,
                                height: 24,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                cursor: "pointer"
                              },
                              onClick: () => handleRemoveImage(idx),
                              children: "✕"
                            }
                          )
                        ] }, idx)) }),
                        /* @__PURE__ */ jsxs("div", { className: "modal-actions", style: { padding: 0, marginTop: 8 }, children: [
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn btn-ghost",
                              onClick: () => setForm({ ...form, step: 1 }),
                              children: t("back")
                            }
                          ),
                          /* @__PURE__ */ jsx("button", { type: "submit", className: "btn", children: t("continue") })
                        ] })
                      ]
                    }
                  ),
                  form.step === 3 && /* @__PURE__ */ jsxs("form", { className: "form", onSubmit: handleSubmit, children: [
                    /* @__PURE__ */ jsxs("div", { className: "card", style: { marginTop: 8 }, children: [
                      /* @__PURE__ */ jsxs("div", { className: "listing-header", children: [
                        /* @__PURE__ */ jsx("h3", { className: "listing-title", children: form.name || t("previewTitlePlaceholder") }),
                        /* @__PURE__ */ jsxs("span", { className: "badge verified", children: [
                          "✓ ",
                          t("verified")
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "listing-meta", children: [
                        t(form.category) || form.category || t("unspecified"),
                        " •",
                        " ",
                        previewLocation || t("unspecified")
                      ] }),
                      form.imagePreview && /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: form.imagePreview,
                          alt: t("previewAlt"),
                          style: {
                            width: "100%",
                            borderRadius: 12,
                            border: "1px solid #e5e7eb",
                            margin: "10px 0"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { className: "listing-description", children: form.description || t("previewDescriptionPlaceholder") }),
                      /* @__PURE__ */ jsxs("div", { className: "listing-meta", style: { marginTop: 8 }, children: [
                        form.offerprice && /* @__PURE__ */ jsxs(Fragment, { children: [
                          "💶 ",
                          /* @__PURE__ */ jsx("strong", { children: form.offerprice }),
                          "  "
                        ] }),
                        form.tags && /* @__PURE__ */ jsxs(Fragment, { children: [
                          "🏷️ ",
                          form.tags
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "plan-selection-section", style: { marginTop: "24px", marginBottom: "24px" }, children: [
                      /* @__PURE__ */ jsx("h4", { style: { marginBottom: "12px" }, children: t("selectPlan") || "Select Plan" }),
                      /* @__PURE__ */ jsx("div", { className: "plan-selection-grid", style: { display: "grid", gap: "12px" }, children: PLANS.map((plan) => /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: `plan-option ${form.plan === plan.id ? "selected" : ""}`,
                          onClick: () => setForm({ ...form, plan: plan.id }),
                          style: {
                            border: form.plan === plan.id ? "2px solid var(--accent)" : "1px solid var(--border)",
                            padding: "12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            background: form.plan === plan.id ? "var(--bg-subtle)" : "var(--bg-card)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                          },
                          children: [
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("span", { style: { fontWeight: "bold", display: "block" }, children: plan.label }),
                              /* @__PURE__ */ jsx("span", { style: { fontSize: "0.9rem", color: "var(--text-muted)" }, children: plan.duration })
                            ] }),
                            /* @__PURE__ */ jsx("span", { style: { color: "var(--accent)", fontWeight: "bold" }, children: plan.price })
                          ]
                        },
                        plan.id
                      )) })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        className: "btn submit",
                        disabled: loading,
                        children: loading ? `⏳ ${t("loading")}` : t("createListing") || "Create Listing"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "section",
                    {
                      className: "card trust-section",
                      style: { marginTop: "5%", height: "fit-content" },
                      children: [
                        /* @__PURE__ */ jsx("h2", { className: "section-title", children: t("whyTrustUs") }),
                        /* @__PURE__ */ jsxs("ul", { className: "trust-list", children: [
                          /* @__PURE__ */ jsxs("li", { children: [
                            "✅",
                            " ",
                            t("trustPoint1")
                          ] }),
                          /* @__PURE__ */ jsxs("li", { children: [
                            "✅",
                            " ",
                            t("trustPoint2")
                          ] }),
                          /* @__PURE__ */ jsxs("li", { children: [
                            "✅",
                            " ",
                            t("trustPoint3")
                          ] }),
                          /* @__PURE__ */ jsxs("li", { children: [
                            "✅",
                            " ",
                            t("trustPoint4")
                          ] })
                        ] })
                      ]
                    }
                  )
                ] }) : /* @__PURE__ */ jsxs("section", { className: "card trust-section", style: { height: "fit-content" }, children: [
                  /* @__PURE__ */ jsx("h2", { className: "section-title", children: t("whyTrustUs") }),
                  /* @__PURE__ */ jsxs("ul", { className: "trust-list", children: [
                    /* @__PURE__ */ jsxs("li", { children: [
                      "✅",
                      " ",
                      t("trustPoint1")
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      "✅",
                      " ",
                      t("trustPoint2")
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      "✅",
                      " ",
                      t("trustPoint3")
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      "✅",
                      " ",
                      t("trustPoint4")
                    ] })
                  ] })
                ] }) })
              ]
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: showMapPicker && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "modal-overlay",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setShowMapPicker(false),
          children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "modal map-modal",
              onClick: (e) => e.stopPropagation(),
              initial: { scale: 0.95, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.95, opacity: 0 },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
                  /* @__PURE__ */ jsx("h3", { className: "modal-title", children: t("chooseOnMap") }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "icon-btn",
                      onClick: () => setShowMapPicker(false),
                      "aria-label": t("close"),
                      children: "✕"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "modal-body", style: { maxHeight: "70vh", overflow: "hidden" }, children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "map-loading", children: "Loading Map..." }), children: /* @__PURE__ */ jsx(
                  NorthMacedoniaMap,
                  {
                    selectedCity: form.locationCity,
                    onSelectCity: (cityName) => {
                      setForm((f) => ({ ...f, locationCity: cityName }));
                      showMessage(
                        `${t("locationSetTo")} ${cityName}`,
                        "success"
                      );
                      setShowMapPicker(false);
                    }
                  }
                ) }) })
              ]
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: showEditMapPicker && editForm && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "modal-overlay",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          style: { zIndex: 55 },
          exit: { opacity: 0 },
          onClick: () => setShowEditMapPicker(false),
          children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "modal map-modal",
              onClick: (e) => e.stopPropagation(),
              initial: { scale: 0.95, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.95, opacity: 0 },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
                  /* @__PURE__ */ jsx("h3", { className: "modal-title", children: t("chooseOnMap") }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "icon-btn",
                      onClick: () => setShowEditMapPicker(false),
                      "aria-label": t("close"),
                      children: "✕"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "modal-body", style: { maxHeight: "70vh", overflow: "hidden" }, children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "map-loading", children: "Loading Map..." }), children: /* @__PURE__ */ jsx(
                  NorthMacedoniaMap,
                  {
                    selectedCity: editForm.locationCity,
                    onSelectCity: (cityName) => {
                      setEditForm((f) => ({ ...f, locationCity: cityName }));
                      showMessage(
                        `${t("locationSetTo")} ${cityName}`,
                        "success"
                      );
                      setShowEditMapPicker(false);
                    }
                  }
                ) }) })
              ]
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(
        EditListingModal,
        {
          t,
          editingListing,
          setEditingListing,
          editForm,
          setEditForm,
          saveEdit,
          categories,
          MK_CITIES,
          stripDangerous,
          editLocationPreview,
          setShowEditMapPicker,
          setSelectedTab,
          handleShareListing,
          handleImageUpload,
          handleRemoveImage
        }
      ) }) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: showAuthModal && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "modal-overlay",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setShowAuthModal(false),
          children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "modal auth-modal",
              onClick: (e) => e.stopPropagation(),
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              exit: { y: 20, opacity: 0 },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
                  /* @__PURE__ */ jsx("h3", { className: "modal-title", children: authMode === "signup" ? t("createAccount") : authTab === "email" ? t("emailLoginSignup") : t("verifyPhone") }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "icon-btn",
                      onClick: () => setShowAuthModal(false),
                      "aria-label": t("close"),
                      children: "✕"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  TabBar,
                  {
                    items: authModeTabs,
                    value: authMode,
                    onChange: handleAuthModeChange,
                    className: "auth-mode-tabs",
                    size: "compact",
                    fullWidth: true
                  }
                ),
                authMode === "login" && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    TabBar,
                    {
                      items: authMethodTabs,
                      value: authTab,
                      onChange: handleAuthTabChange,
                      className: "auth-tabs",
                      size: "compact",
                      fullWidth: true
                    }
                  ),
                  authTab === "email" ? /* @__PURE__ */ jsxs("div", { className: "modal-body auth-body auth-body-card", children: [
                    /* @__PURE__ */ jsx("p", { className: "auth-subtitle", children: t("loginSubtitle") }),
                    /* @__PURE__ */ jsxs("div", { className: "auth-field-group", children: [
                      /* @__PURE__ */ jsx("span", { className: "field-label", children: t("email") }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          className: "input",
                          type: "email",
                          placeholder: t("email"),
                          value: email,
                          onChange: (e) => setEmail(e.target.value)
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "auth-field-group", children: [
                      /* @__PURE__ */ jsx("span", { className: "field-label", children: t("password") }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          className: "input",
                          type: "password",
                          placeholder: t("password"),
                          value: password,
                          onChange: (e) => setPassword(e.target.value)
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "auth-actions", children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "btn full-width",
                        onClick: async () => {
                          if (!validateEmail(email))
                            return showMessage(t("enterValidEmail"), "error");
                          try {
                            await signInWithEmailAndPassword(auth, email, password);
                            showMessage(t("signedIn"), "success");
                            setShowAuthModal(false);
                            setEmail("");
                            setPassword("");
                          } catch (e) {
                            showMessage(e.message, "error");
                          }
                        },
                        children: t("login")
                      }
                    ) })
                  ] }) : (
                    /* PHONE LOGIN */
                    /* @__PURE__ */ jsxs("div", { className: "modal-body auth-body auth-body-card", children: [
                      /* @__PURE__ */ jsx("p", { className: "auth-subtitle", children: t("phoneLoginSubtitle") }),
                      /* @__PURE__ */ jsxs("div", { className: "auth-field-group", children: [
                        /* @__PURE__ */ jsx("span", { className: "field-label", children: t("phoneNumber") }),
                        /* @__PURE__ */ jsxs("div", { className: "phone-input-group", children: [
                          /* @__PURE__ */ jsx(
                            "select",
                            {
                              className: "select phone-country",
                              value: countryCode,
                              onChange: (e) => setCountryCode(e.target.value),
                              children: countryCodes.map((c) => /* @__PURE__ */ jsxs("option", { value: c.code, children: [
                                c.name,
                                " (",
                                c.code,
                                ")"
                              ] }, c.code))
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "input",
                            {
                              className: "input phone-number",
                              type: "tel",
                              placeholder: t("phoneNumber"),
                              value: phoneNumber,
                              onChange: (e) => setPhoneNumber(e.target.value.replace(/\D/g, "")),
                              maxLength: "12",
                              inputMode: "numeric"
                            }
                          )
                        ] })
                      ] }),
                      !confirmationResult ? /* @__PURE__ */ jsx("div", { className: "auth-actions", children: /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: "btn full-width",
                          onClick: async () => {
                            const rest = (phoneNumber || "").replace(/\D/g, "");
                            if (!rest || rest.length < 5 || rest.length > 12)
                              return showMessage(t("enterValidPhone"), "error");
                            const fullPhone = countryCode + rest;
                            if (!validatePhone(fullPhone))
                              return showMessage(t("enterValidPhone"), "error");
                            setPhoneLoading(true);
                            try {
                              if (!window.recaptchaVerifier)
                                createRecaptcha("recaptcha-container");
                              const result = await signInWithPhoneNumber(
                                auth,
                                fullPhone,
                                window.recaptchaVerifier
                              );
                              setConfirmationResult(result);
                              showMessage(t("codeSent"), "success");
                            } catch (err) {
                              console.error(err);
                              showMessage(err.message, "error");
                              if (window.recaptchaVerifier) {
                                window.recaptchaVerifier.clear();
                                window.recaptchaVerifier = null;
                              }
                            } finally {
                              setPhoneLoading(false);
                            }
                          },
                          disabled: phoneLoading,
                          children: phoneLoading ? t("sendingCode") : t("sendLink")
                        }
                      ) }) : /* @__PURE__ */ jsxs("div", { className: "auth-actions", children: [
                        /* @__PURE__ */ jsxs("div", { className: "auth-field-group", children: [
                          /* @__PURE__ */ jsx("span", { className: "field-label", children: t("enterCode") }),
                          /* @__PURE__ */ jsx(
                            "input",
                            {
                              className: "input",
                              type: "text",
                              placeholder: t("enterCode"),
                              value: verificationCode,
                              onChange: (e) => setVerificationCode(
                                e.target.value.replace(/\D/g, "")
                              ),
                              maxLength: "6",
                              inputMode: "numeric"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            className: "btn full-width",
                            onClick: async () => {
                              if (!confirmationResult || !verificationCode.trim())
                                return showMessage(t("enterCode"), "error");
                              if (!/^\d{6}$/.test(verificationCode.trim()))
                                return showMessage(t("invalidCode"), "error");
                              setPhoneLoading(true);
                              try {
                                await confirmationResult.confirm(verificationCode);
                                showMessage(t("signedIn"), "success");
                                setShowAuthModal(false);
                                setPhoneNumber("");
                                setVerificationCode("");
                                setConfirmationResult(null);
                              } catch (err) {
                                showMessage(err.message, "error");
                              } finally {
                                setPhoneLoading(false);
                              }
                            },
                            disabled: phoneLoading,
                            children: phoneLoading ? t("verifying") : t("verifyPhone")
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx("div", { id: "recaptcha-container", className: "recaptcha" })
                    ] })
                  )
                ] }),
                authMode === "signup" && /* @__PURE__ */ jsxs("div", { className: "modal-body auth-body auth-body-card", children: [
                  /* @__PURE__ */ jsx("p", { className: "auth-subtitle", children: t("signupSubtitle") || "Create a BizCall account to post and manage your listings." }),
                  /* @__PURE__ */ jsxs("div", { className: "auth-field-group", children: [
                    /* @__PURE__ */ jsx("span", { className: "field-label", children: t("name") }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        className: "input",
                        type: "text",
                        value: displayName,
                        onChange: (e) => setDisplayName(e.target.value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "auth-field-group", children: [
                    /* @__PURE__ */ jsx("span", { className: "field-label", children: t("email") }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        className: "input",
                        type: "email",
                        value: email,
                        onChange: (e) => setEmail(e.target.value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "auth-field-group", children: [
                    /* @__PURE__ */ jsx("span", { className: "field-label", children: t("password") }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        className: "input",
                        type: "password",
                        value: password,
                        onChange: (e) => setPassword(e.target.value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "auth-field-group", children: [
                    /* @__PURE__ */ jsx("span", { className: "field-label", children: t("repeatNewPassword") }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        className: "input",
                        type: "password",
                        value: passwordForm.repeatNewPassword,
                        onChange: (e) => setPasswordForm({ repeatNewPassword: e.target.value })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "auth-field-group", children: [
                    /* @__PURE__ */ jsx("span", { className: "field-label", children: t("phoneNumber") }),
                    /* @__PURE__ */ jsxs("div", { className: "phone-input-group", children: [
                      /* @__PURE__ */ jsx(
                        "select",
                        {
                          className: "select phone-country",
                          value: countryCode,
                          onChange: (e) => setCountryCode(e.target.value),
                          children: countryCodes.map((c) => /* @__PURE__ */ jsxs("option", { value: c.code, children: [
                            c.name,
                            " (",
                            c.code,
                            ")"
                          ] }, c.code))
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          className: "input phone-number",
                          type: "tel",
                          value: phoneNumber,
                          onChange: (e) => setPhoneNumber(e.target.value.replace(/\D/g, "")),
                          maxLength: "12",
                          inputMode: "numeric"
                        }
                      )
                    ] })
                  ] }),
                  !confirmationResult && /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "btn full-width",
                      disabled: phoneLoading,
                      onClick: async () => {
                        var _a3, _b3;
                        if (!validateEmail(email))
                          return showMessage(t("enterValidEmail"), "error");
                        if (!displayName.trim())
                          return showMessage(t("enterName"), "error");
                        if (password.length < 6)
                          return showMessage(t("passwordTooShort"), "error");
                        if (passwordForm.repeatNewPassword !== password)
                          return showMessage(t("passwordsDontMatch"), "error");
                        const raw = phoneNumber.replace(/\D/g, "");
                        if (!raw || raw.length < 5)
                          return showMessage(t("enterValidPhone"), "error");
                        const fullPhone = countryCode + raw;
                        if (!validatePhone(fullPhone))
                          return showMessage(t("enterValidPhone"), "error");
                        setPhoneLoading(true);
                        try {
                          const verifier = getSignupRecaptcha();
                          const confirmation = await signInWithPhoneNumber(
                            auth,
                            fullPhone,
                            verifier
                          );
                          setConfirmationResult(confirmation);
                          showMessage(t("codeSent"), "success");
                        } catch (err) {
                          console.error(err);
                          (_b3 = (_a3 = window.signupRecaptchaVerifier) == null ? void 0 : _a3.clear) == null ? void 0 : _b3.call(_a3);
                          window.signupRecaptchaVerifier = null;
                          showMessage(err.message, "error");
                        } finally {
                          setPhoneLoading(false);
                        }
                      },
                      children: t("createAccount")
                    }
                  ),
                  confirmationResult && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsxs("div", { className: "auth-field-group", style: { marginTop: 12 }, children: [
                      /* @__PURE__ */ jsx("span", { className: "field-label", children: t("enterCode") }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          className: "input",
                          value: verificationCode,
                          onChange: (e) => setVerificationCode(e.target.value.replace(/\D/g, "")),
                          maxLength: "6"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "btn full-width",
                        disabled: phoneLoading,
                        onClick: async () => {
                          if (!/^\d{6}$/.test(verificationCode))
                            return showMessage(t("invalidCode"), "error");
                          setPhoneLoading(true);
                          try {
                            const result = await confirmationResult.confirm(
                              verificationCode
                            );
                            const user2 = result.user;
                            try {
                              const emailCred = EmailAuthProvider.credential(
                                email,
                                password
                              );
                              await linkWithCredential(user2, emailCred);
                              if (displayName.trim()) {
                                await updateProfile(user2, { displayName: displayName.trim() });
                              }
                              await set(ref(db, `users/${user2.uid}`), {
                                name: displayName.trim() || null,
                                email: user2.email,
                                phone: normalizePhoneForStorage(countryCode + phoneNumber),
                                createdAt: Date.now(),
                                subscribedToMarketing: true
                              });
                              await sendEmailVerification(user2);
                              showMessage(t("signupSuccess"), "success");
                              setAuthMode("verify");
                              setConfirmationResult(null);
                              setVerificationCode("");
                            } catch (innerErr) {
                              console.error("Signup incomplete, rolling back user creation:", innerErr);
                              await user2.delete().catch((cleanupErr) => console.error("Failed to cleanup user:", cleanupErr));
                              throw innerErr;
                            }
                          } catch (err) {
                            console.error(err);
                            showMessage(err.message, "error");
                          } finally {
                            setPhoneLoading(false);
                          }
                        },
                        children: t("verifyPhone")
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { id: "recaptcha-signup", className: "recaptcha" })
                ] }),
                authMode === "verify" && /* @__PURE__ */ jsxs("div", { className: "modal-body auth-body auth-body-card", children: [
                  /* @__PURE__ */ jsx("p", { className: "auth-subtitle", children: t("verifyEmailHint") }),
                  /* @__PURE__ */ jsxs("div", { className: "auth-verify-box", children: [
                    /* @__PURE__ */ jsxs("div", { className: "auth-verify-row", children: [
                      /* @__PURE__ */ jsx("span", { className: "auth-verify-label", children: t("email") }),
                      /* @__PURE__ */ jsx("span", { className: "auth-verify-value", children: ((_c = auth.currentUser) == null ? void 0 : _c.email) || email })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "auth-verify-footnote", children: t("verifyFootnote") })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "auth-actions", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "btn btn-ghost full-width",
                        disabled: resendBusy,
                        onClick: async () => {
                          if (!auth.currentUser) return showMessage("You must be logged in.", "error");
                          setResendBusy(true);
                          try {
                            await sendEmailVerification(auth.currentUser);
                            showMessage(t("emailLinkSent"), "success");
                          } catch (err) {
                            showMessage(String((err == null ? void 0 : err.message) || err), "error");
                          } finally {
                            setResendBusy(false);
                          }
                        },
                        children: t("resendEmail")
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "btn full-width",
                        disabled: verifyBusy,
                        onClick: async () => {
                          if (!auth.currentUser) return showMessage("You must be logged in.", "error");
                          setVerifyBusy(true);
                          try {
                            await auth.currentUser.reload();
                            if (auth.currentUser.emailVerified) {
                              showMessage(t("emailVerified"), "success");
                              setShowAuthModal(false);
                              setAuthMode("login");
                            } else {
                              showMessage(t("notVerifiedYet"), "error");
                            }
                          } catch (err) {
                            showMessage(String((err == null ? void 0 : err.message) || err), "error");
                          } finally {
                            setVerifyBusy(false);
                          }
                        },
                        children: verifyBusy ? t("verifying") : t("iVerified")
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "btn btn-ghost full-width",
                        onClick: () => {
                          showMessage(t("verifyLater"), "success");
                          setShowAuthModal(false);
                          setAuthMode("login");
                        },
                        children: t("verifyLater")
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: postSignupVerifyOpen && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "modal-overlay",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setPostSignupVerifyOpen(false),
          children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "modal verify-email-modal",
              onClick: (e) => e.stopPropagation(),
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              exit: { y: 20, opacity: 0 },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
                  /* @__PURE__ */ jsx("h3", { className: "modal-title", children: t("verifyYourEmail") }),
                  /* @__PURE__ */ jsx("button", { className: "icon-btn", onClick: () => setPostSignupVerifyOpen(false), children: "✕" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "modal-body", children: [
                  /* @__PURE__ */ jsx("p", { className: "auth-subtitle", children: t("verifyEmailHint") }),
                  /* @__PURE__ */ jsxs("div", { className: "verify-actions", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "btn full-width",
                        onClick: async () => {
                          try {
                            const u = auth.currentUser;
                            if (!u) return showMessage(t("notSignedIn"), "error");
                            await sendEmailVerification(u);
                            showMessage(t("emailLinkSent"), "success");
                          } catch (err) {
                            showMessage(err.message, "error");
                          }
                        },
                        children: t("resendEmail")
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "btn btn-ghost full-width",
                        onClick: async () => {
                          var _a3, _b3;
                          try {
                            await ((_a3 = auth.currentUser) == null ? void 0 : _a3.reload());
                            if ((_b3 = auth.currentUser) == null ? void 0 : _b3.emailVerified) {
                              showMessage(t("emailVerified"), "success");
                              setPostSignupVerifyOpen(false);
                            } else {
                              showMessage(
                                t("notVerifiedYet"),
                                "error"
                              );
                            }
                          } catch (err) {
                            showMessage(err.message, "error");
                          }
                        },
                        children: t("iVerified")
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "btn btn-ghost full-width",
                        onClick: () => setPostSignupVerifyOpen(false),
                        children: t("verifyLater")
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "verify-footnote", children: t("verifyFootnote") })
                ] })
              ]
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: selectedListing && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "modal-overlay",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => {
            setSelectedListing(null);
            const url = new URL(window.location.href);
            url.searchParams.delete("listing");
            window.history.replaceState({}, "", url.toString());
          },
          children: /* @__PURE__ */ jsxs(motion.div, { className: "modal listing-details-modal", onClick: (e) => e.stopPropagation(), initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, transition: { duration: 0.3 }, children: [
            /* @__PURE__ */ jsxs("div", { className: "modal-header category-banner", style: { background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff" }, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "category-icon", style: { fontSize: "1.5rem" }, children: categoryIcons[selectedListing.category] || "🏷️" }),
                /* @__PURE__ */ jsx("h3", { className: "modal-title", children: selectedListing.name })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "icon-btn text-white",
                  onClick: () => {
                    setSelectedListing(null);
                    const url = new URL(window.location.href);
                    url.searchParams.delete("listing");
                    window.history.replaceState({}, "", url.toString());
                  },
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "modal-body listing-details-body", children: [
              /* @__PURE__ */ jsxs("div", { className: "listing-layout", children: [
                /* @__PURE__ */ jsxs("div", { className: "listing-main", children: [
                  /* @__PURE__ */ jsxs("div", { className: "listing-hero", children: [
                    /* @__PURE__ */ jsxs("div", { className: "hero-left", children: [
                      /* @__PURE__ */ jsx("div", { className: "hero-icon-bubble", children: categoryIcons[selectedListing.category] || "🏷️" }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: t("listing") }),
                        /* @__PURE__ */ jsx("h3", { className: "hero-title", children: selectedListing.name }),
                        /* @__PURE__ */ jsxs("div", { className: "chip-row", children: [
                          /* @__PURE__ */ jsx("span", { className: "pill", children: t(selectedListing.category) || selectedListing.category }),
                          /* @__PURE__ */ jsx("span", { className: "pill pill-soft", children: selectedListing.location || t("unspecified") })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "status-stack", children: [
                      /* @__PURE__ */ jsx("span", { className: `status-pill ${selectedListing.status === "verified" ? "is-verified" : "is-pending"}`, children: selectedListing.status === "verified" ? "✅ " + t("verified") : "⏳ " + t("pending") }),
                      selectedListing.expiresAt && /* @__PURE__ */ jsxs("span", { className: "small-muted", children: [
                        t("expires"),
                        ": ",
                        new Date(selectedListing.expiresAt).toLocaleDateString()
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "rating-chip", children: [
                        "⭐ ",
                        feedbackStats.avg ?? "–",
                        " / 5"
                      ] })
                    ] })
                  ] }),
                  (() => {
                    const images = selectedListing.images && selectedListing.images.length > 0 ? selectedListing.images : selectedListing.imagePreview ? [selectedListing.imagePreview] : [];
                    if (images.length === 0) return null;
                    return /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsxs("div", { className: "modal-carousel-container", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: images[modalImageIndex] || images[0],
                            alt: selectedListing.name,
                            className: "modal-carousel-image"
                          }
                        ),
                        images.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              className: "modal-carousel-btn prev",
                              onClick: (e) => {
                                e.stopPropagation();
                                setModalImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
                              },
                              children: "‹"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              className: "modal-carousel-btn next",
                              onClick: (e) => {
                                e.stopPropagation();
                                setModalImageIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
                              },
                              children: "›"
                            }
                          ),
                          /* @__PURE__ */ jsx("div", { className: "modal-carousel-dots", children: images.map((_, idx) => /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `modal-carousel-dot ${idx === modalImageIndex ? "active" : ""}`,
                              onClick: (e) => {
                                e.stopPropagation();
                                setModalImageIndex(idx);
                              }
                            },
                            idx
                          )) })
                        ] }),
                        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: 16, left: 16, display: "flex", gap: 8, zIndex: 5 }, children: selectedListing.offerprice && /* @__PURE__ */ jsx("span", { className: "pill pill-price", style: { boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }, children: selectedListing.offerprice }) })
                      ] }),
                      images.length > 1 && /* @__PURE__ */ jsx("div", { className: "modal-carousel-thumbs", children: images.map((img, idx) => /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: img,
                          alt: `Thumb ${idx}`,
                          className: `modal-carousel-thumb ${idx === modalImageIndex ? "active" : ""}`,
                          onClick: (e) => {
                            e.stopPropagation();
                            setModalImageIndex(idx);
                          }
                        },
                        idx
                      )) })
                    ] });
                  })(),
                  /* @__PURE__ */ jsxs("div", { className: "mobile-cta-bar", children: [
                    /* @__PURE__ */ jsxs("div", { className: "mobile-cta-meta", children: [
                      /* @__PURE__ */ jsx("span", { className: "pill pill-soft", children: listingLocationLabel }),
                      /* @__PURE__ */ jsx("span", { className: "pill", children: listingPriceLabel })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mobile-cta-actions", children: [
                      /* @__PURE__ */ jsxs("button", { className: "quick-action-btn", disabled: !listingContactAvailable, onClick: () => listingContactAvailable && window.open(`tel:${selectedListing.contact}`), children: [
                        "📞 ",
                        t("call")
                      ] }),
                      /* @__PURE__ */ jsxs("button", { className: "quick-action-btn", onClick: () => window.open(`mailto:${selectedListing.userEmail || ""}?subject=Regarding%20${encodeURIComponent(selectedListing.name)}`), children: [
                        "✉️ ",
                        t("emailAction")
                      ] }),
                      /* @__PURE__ */ jsxs("button", { className: "quick-action-btn ghost", disabled: !listingContactAvailable, onClick: () => {
                        if (!listingContactAvailable) return;
                        navigator.clipboard.writeText(selectedListing.contact);
                        showMessage(t("copied"), "success");
                      }, children: [
                        "📋 ",
                        t("copy")
                      ] }),
                      /* @__PURE__ */ jsxs("button", { className: "quick-action-btn ghost", onClick: () => handleShareListing(selectedListing), children: [
                        "🔗 ",
                        t("share")
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          className: "quick-action-btn ghost",
                          style: { color: "#ef4444", borderColor: "#fee2e2" },
                          onClick: () => {
                            setReportingListingId(selectedListing.id);
                            setShowReportModal(true);
                          },
                          children: [
                            "🚩 ",
                            t("report")
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "listing-highlight-grid", children: [
                    /* @__PURE__ */ jsxs("div", { className: "highlight-card", children: [
                      /* @__PURE__ */ jsx("p", { className: "highlight-label", children: t("status") }),
                      /* @__PURE__ */ jsx("p", { className: "highlight-value", children: selectedListing.status === "verified" ? t("verified") : t("pendingVerification") })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "highlight-card", children: [
                      /* @__PURE__ */ jsx("p", { className: "highlight-label", children: t("listedOn") }),
                      /* @__PURE__ */ jsx("p", { className: "highlight-value", children: selectedListing.createdAt ? new Date(selectedListing.createdAt).toLocaleDateString() : t("unspecified") })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "highlight-card", children: [
                      /* @__PURE__ */ jsx("p", { className: "highlight-label", children: t("priceRangeLabel") }),
                      /* @__PURE__ */ jsx("p", { className: "highlight-value", children: listingPriceLabel })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "highlight-card", children: [
                      /* @__PURE__ */ jsx("p", { className: "highlight-label", children: t("locationDetails") }),
                      /* @__PURE__ */ jsx("p", { className: "highlight-value", children: listingLocationLabel }),
                      ((_d = selectedListing.locationData) == null ? void 0 : _d.mapsUrl) && /* @__PURE__ */ jsx("a", { className: "map-link", href: selectedListing.locationData.mapsUrl, target: "_blank", rel: "noreferrer", children: t("openInMaps") })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "highlight-card", children: [
                      /* @__PURE__ */ jsx("p", { className: "highlight-label", children: t("reputation") }),
                      /* @__PURE__ */ jsx("p", { className: "highlight-value", children: feedbackStats.avg != null ? `${feedbackStats.avg}/5` : t("noFeedback") }),
                      /* @__PURE__ */ jsxs("p", { className: "small-muted", children: [
                        t("recentFeedback"),
                        ": ",
                        feedbackStats.count
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "listing-section", children: [
                    /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
                      /* @__PURE__ */ jsx("h4", { children: t("aboutListing") }),
                      /* @__PURE__ */ jsxs("span", { className: "pill muted", children: [
                        t("category"),
                        ": ",
                        t(selectedListing.category) || selectedListing.category
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "listing-description-full", children: selectedListing.description }),
                    /* @__PURE__ */ jsxs("div", { className: "soft-grid", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "highlight-label", children: t("pricing") }),
                        /* @__PURE__ */ jsx("p", { className: "highlight-value", children: listingPriceLabel })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "highlight-label", children: t("contactEmail") }),
                        /* @__PURE__ */ jsx("p", { className: "highlight-value", children: selectedListing.userEmail || t("unspecified") })
                      ] })
                    ] }),
                    selectedListing.tags && /* @__PURE__ */ jsx("div", { className: "tag-chip-row", children: (selectedListing.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean).map((tag) => /* @__PURE__ */ jsx("span", { className: "tag-chip", children: tag }, tag)) }),
                    selectedListing.socialLink && /* @__PURE__ */ jsxs("a", { className: "link-badge", href: selectedListing.socialLink, target: "_blank", rel: "noreferrer", children: [
                      t("websiteLabel"),
                      ": ",
                      selectedListing.socialLink
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "contact-panel", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "panel-title", children: t("contact") }),
                      /* @__PURE__ */ jsx("p", { className: "panel-subtitle", children: selectedListing.contact || t("unspecified") }),
                      /* @__PURE__ */ jsx("p", { className: "panel-hint", children: t("contactAutofill") })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "quick-actions", children: [
                      /* @__PURE__ */ jsxs("div", { className: "quick-actions-header", children: [
                        /* @__PURE__ */ jsx("p", { className: "highlight-label", children: t("quickActions") }),
                        /* @__PURE__ */ jsx("p", { className: "small-muted", children: t("postingReadyHint") })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "quick-action-buttons", children: [
                        /* @__PURE__ */ jsxs("button", { className: "quick-action-btn", disabled: !listingContactAvailable, onClick: () => listingContactAvailable && window.open(`tel:${selectedListing.contact}`), children: [
                          "📞 ",
                          t("call")
                        ] }),
                        /* @__PURE__ */ jsxs("button", { className: "quick-action-btn", onClick: () => window.open(`mailto:${selectedListing.userEmail || ""}?subject=Regarding%20${encodeURIComponent(selectedListing.name)}`), children: [
                          "✉️ ",
                          t("emailAction")
                        ] }),
                        /* @__PURE__ */ jsxs("button", { className: "quick-action-btn ghost", disabled: !listingContactAvailable, onClick: () => {
                          if (!listingContactAvailable) return;
                          navigator.clipboard.writeText(selectedListing.contact);
                          showMessage(t("copied"), "success");
                        }, children: [
                          "📋 ",
                          t("copy")
                        ] }),
                        /* @__PURE__ */ jsxs("button", { className: "quick-action-btn ghost", onClick: () => handleShareListing(selectedListing), children: [
                          "🔗 ",
                          t("share")
                        ] })
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("aside", { className: "listing-sidebar", children: [
                  /* @__PURE__ */ jsxs("div", { className: "sidebar-card", children: [
                    /* @__PURE__ */ jsx("p", { className: "sidebar-title", children: t("quickFacts") }),
                    /* @__PURE__ */ jsxs("ul", { className: "fact-list", children: [
                      /* @__PURE__ */ jsxs("li", { children: [
                        /* @__PURE__ */ jsx("span", { children: t("statusLabel") }),
                        /* @__PURE__ */ jsx("strong", { children: selectedListing.status === "verified" ? t("verified") : t("pendingVerification") })
                      ] }),
                      /* @__PURE__ */ jsxs("li", { children: [
                        /* @__PURE__ */ jsx("span", { children: t("listedOn") }),
                        /* @__PURE__ */ jsx("strong", { children: selectedListing.createdAt ? new Date(selectedListing.createdAt).toLocaleDateString() : t("unspecified") })
                      ] }),
                      /* @__PURE__ */ jsxs("li", { children: [
                        /* @__PURE__ */ jsx("span", { children: t("locationLabelFull") }),
                        /* @__PURE__ */ jsx("strong", { children: selectedListing.location || t("unspecified") })
                      ] }),
                      /* @__PURE__ */ jsxs("li", { children: [
                        /* @__PURE__ */ jsx("span", { children: t("pricing") }),
                        /* @__PURE__ */ jsx("strong", { children: selectedListing.offerprice || t("unspecified") })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "sidebar-card", children: [
                    /* @__PURE__ */ jsx("p", { className: "sidebar-title", children: t("shareListing") }),
                    /* @__PURE__ */ jsxs("div", { className: "sidebar-actions", children: [
                      /* @__PURE__ */ jsxs("button", { className: "quick-action-btn", onClick: () => handleShareListing(selectedListing), children: [
                        "🔗 ",
                        t("share")
                      ] }),
                      /* @__PURE__ */ jsxs("button", { className: "quick-action-btn ghost", onClick: () => toggleFav(selectedListing.id), children: [
                        favorites.includes(selectedListing.id) ? "★" : "☆",
                        " ",
                        t("favorite")
                      ] }),
                      ((_e = selectedListing.locationData) == null ? void 0 : _e.mapsUrl) && /* @__PURE__ */ jsxs("button", { className: "quick-action-btn ghost", onClick: () => window.open(selectedListing.locationData.mapsUrl, "_blank"), children: [
                        "🗺️ ",
                        t("openInMaps")
                      ] }),
                      /* @__PURE__ */ jsxs("button", { className: "quick-action-btn ghost", onClick: () => {
                        setReportingListingId(selectedListing.id);
                        setShowReportModal(true);
                      }, children: [
                        "🚩 ",
                        t("report")
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "sidebar-card muted-card", children: [
                    /* @__PURE__ */ jsx("p", { className: "sidebar-title", children: t("cloudFeedbackNote") }),
                    /* @__PURE__ */ jsx("p", { className: "small-muted", children: t("feedbackSidebarBlurb") })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "feedback-section", children: [
                /* @__PURE__ */ jsxs("div", { className: "feedback-header", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "eyebrow", children: t("reputation") }),
                    /* @__PURE__ */ jsx("h4", { children: t("communityFeedback") }),
                    /* @__PURE__ */ jsx("p", { className: "small-muted", children: t("cloudFeedbackNote") })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "feedback-summary", children: [
                    /* @__PURE__ */ jsx("div", { className: "score-circle", children: feedbackStats.avg ?? "–" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("p", { className: "summary-label", children: [
                        feedbackStats.count || 0,
                        " ",
                        t("reviews")
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "small-muted", children: t("averageRating") })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "feedback-grid", children: [
                  /* @__PURE__ */ jsxs("div", { className: "feedback-form-card", children: [
                    /* @__PURE__ */ jsxs("div", { className: "rating-input-row", children: [
                      /* @__PURE__ */ jsx("label", { children: t("ratingLabel") }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "range",
                          min: "1",
                          max: "5",
                          step: "1",
                          value: feedbackDraft.rating,
                          onChange: (e) => setFeedbackDraft((d) => ({ ...d, rating: Number(e.target.value) }))
                        }
                      ),
                      /* @__PURE__ */ jsxs("span", { className: "rating-value", children: [
                        feedbackDraft.rating,
                        "/5"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        className: "feedback-textarea",
                        rows: 3,
                        value: feedbackDraft.comment,
                        placeholder: t("commentPlaceholderDetailed"),
                        onChange: (e) => setFeedbackDraft((d) => ({ ...d, comment: e.target.value }))
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "feedback-form-actions", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: "btn",
                          onClick: () => handleFeedbackSubmit(selectedListing.id),
                          disabled: feedbackSaving,
                          children: feedbackSaving ? `⏳ ${t("saving")}` : `💾 ${t("saveFeedback")}`
                        }
                      ),
                      /* @__PURE__ */ jsxs("span", { className: "small-muted", children: [
                        t("recentFeedback"),
                        ": ",
                        feedbackStats.count
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "feedback-list-card", children: [
                    /* @__PURE__ */ jsxs("div", { className: "feedback-list-header", children: [
                      /* @__PURE__ */ jsx("p", { className: "sidebar-title", children: t("recentFeedback") }),
                      /* @__PURE__ */ jsxs("span", { className: "pill pill-soft", children: [
                        "⭐ ",
                        feedbackStats.avg ?? "–",
                        " / 5"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "feedback-scroll", children: feedbackStats.entries.length === 0 ? /* @__PURE__ */ jsx("p", { className: "small-muted", children: t("noFeedback") }) : feedbackStats.entries.map((entry, idx) => /* @__PURE__ */ jsxs("div", { className: "feedback-item", children: [
                      entry.author && /* @__PURE__ */ jsx("div", { className: "feedback-author", children: entry.author }),
                      /* @__PURE__ */ jsxs("div", { className: "feedback-meta", children: [
                        /* @__PURE__ */ jsxs("span", { className: "pill pill-soft", children: [
                          entry.rating,
                          "/5"
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "small-muted", children: new Date(entry.createdAt).toLocaleDateString() })
                      ] }),
                      entry.comment && /* @__PURE__ */ jsx("p", { className: "feedback-comment", children: entry.comment })
                    ] }, idx)) })
                  ] })
                ] })
              ] })
            ] })
          ] })
        }
      ) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: extendModalOpen && extendTarget && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "modal-overlay",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setExtendModalOpen(false),
          children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "modal",
              onClick: (e) => e.stopPropagation(),
              initial: { scale: 0.95, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.95, opacity: 0 },
              style: { maxWidth: "500px" },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
                  /* @__PURE__ */ jsx("h3", { className: "modal-title", children: t("extendListing") || "Extend Listing" }),
                  /* @__PURE__ */ jsx("button", { className: "icon-btn", onClick: () => setExtendModalOpen(false), children: "✕" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "modal-body", style: { padding: "24px" }, children: [
                  /* @__PURE__ */ jsx("p", { style: { marginBottom: 16 }, children: t("extendDescription") || "Choose a plan to extend your listing duration." }),
                  /* @__PURE__ */ jsx("div", { className: "plan-selection-grid", style: { display: "grid", gap: "12px", marginBottom: "24px" }, children: PLANS.map((plan) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `plan-option ${selectedExtendPlan === plan.id ? "selected" : ""}`,
                      onClick: () => setSelectedExtendPlan(plan.id),
                      style: {
                        border: selectedExtendPlan === plan.id ? "2px solid var(--accent)" : "1px solid var(--border)",
                        padding: "12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        background: selectedExtendPlan === plan.id ? "var(--bg-subtle)" : "var(--bg-card)"
                      },
                      children: [
                        /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
                          /* @__PURE__ */ jsx("span", { style: { fontWeight: "bold" }, children: plan.label }),
                          /* @__PURE__ */ jsx("span", { style: { color: "var(--accent)", fontWeight: "bold" }, children: plan.price })
                        ] }),
                        /* @__PURE__ */ jsx("div", { style: { fontSize: "0.9rem", color: "var(--text-muted)" }, children: plan.duration })
                      ]
                    },
                    plan.id
                  )) }),
                  /* @__PURE__ */ jsxs("div", { className: "modal-actions", children: [
                    /* @__PURE__ */ jsx("button", { className: "btn btn-ghost", onClick: () => setExtendModalOpen(false), children: t("cancel") }),
                    /* @__PURE__ */ jsx("button", { className: "btn btn-accent", onClick: handleProceedExtend, children: t("proceedToPayment") || "Proceed to Payment" })
                  ] })
                ] })
              ]
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: showReportModal && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "modal-overlay",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setShowReportModal(false),
          children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "modal",
              onClick: (e) => e.stopPropagation(),
              initial: { scale: 0.95, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.95, opacity: 0 },
              style: { maxWidth: "500px" },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
                  /* @__PURE__ */ jsx("h3", { className: "modal-title", children: t("reportListing") }),
                  /* @__PURE__ */ jsx("button", { className: "icon-btn", onClick: () => setShowReportModal(false), children: "✕" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "modal-body", style: { padding: "20px" }, children: [
                  /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
                    /* @__PURE__ */ jsx("label", { className: "field-label", children: t("reportReason") }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        className: "select",
                        value: reportReason,
                        onChange: (e) => setReportReason(e.target.value),
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "spam", children: t("spam") }),
                          /* @__PURE__ */ jsx("option", { value: "inappropriate", children: t("inappropriate") }),
                          /* @__PURE__ */ jsx("option", { value: "other", children: t("other") })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
                    /* @__PURE__ */ jsx("label", { className: "field-label", children: t("description") }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        className: "input",
                        rows: "4",
                        value: reportDescription,
                        onChange: (e) => setReportDescription(e.target.value),
                        placeholder: t("reportReason")
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "modal-actions", children: [
                    /* @__PURE__ */ jsx("button", { className: "btn btn-ghost", onClick: () => setShowReportModal(false), children: t("cancel") }),
                    /* @__PURE__ */ jsx("button", { className: "btn", onClick: handleReportSubmit, children: t("sendReport") })
                  ] })
                ] })
              ]
            }
          )
        }
      ) }),
      showTerms && /* @__PURE__ */ jsx(TermsModal, { onClose: () => setShowTerms(false), t }),
      showPrivacy && /* @__PURE__ */ jsx(PrivacyModal, { onClose: () => setShowPrivacy(false), t }),
      /* @__PURE__ */ jsx(CookieConsent, { t }),
      /* @__PURE__ */ jsx("footer", { className: "footer", children: /* @__PURE__ */ jsxs("p", { children: [
        "© 2024 ",
        t("appName"),
        " • ",
        t("bizCall")
      ] }) }),
      /* @__PURE__ */ jsx("div", { id: "recaptcha-signup", style: { display: "none" } }),
      /* @__PURE__ */ jsx("div", { id: "recaptcha-container", style: { display: "none" } })
    ] })
  ] });
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    var _a2;
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "20px",
        textAlign: "center",
        background: "#f8fafc",
        color: "#1e293b"
      }, children: [
        /* @__PURE__ */ jsx("h1", { style: { fontSize: "2rem", marginBottom: "1rem" }, children: "Something went wrong." }),
        /* @__PURE__ */ jsx("p", { style: { marginBottom: "2rem", color: "#64748b" }, children: "We apologize for the inconvenience. Please try refreshing the page." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => window.location.reload(),
            style: {
              padding: "10px 20px",
              fontSize: "1rem",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            },
            children: "Refresh Page"
          }
        ),
        process.env.NODE_ENV === "development" && /* @__PURE__ */ jsx("pre", { style: { marginTop: "20px", textAlign: "left", background: "#e2e8f0", padding: "10px", borderRadius: "4px", maxWidth: "100%", overflow: "auto" }, children: (_a2 = this.state.error) == null ? void 0 : _a2.toString() })
      ] });
    }
    return this.props.children;
  }
}
function render(url, context, initialData = {}) {
  const helmetContext = {};
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(
      App,
      {
        initialListings: initialData.listings,
        initialPublicListings: initialData.publicListings
      }
    ) }) })
  );
  const { helmet } = helmetContext;
  return { html, helmet };
}
export {
  CITIES_WITH_COORDS as C,
  render
};
