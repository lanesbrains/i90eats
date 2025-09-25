import { d as defineEventHandler, r as readBody, c as createError, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import jwt from 'jsonwebtoken';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const login_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing credentials"
    });
  }
  const user = {
    id: "business_user_id",
    // From your database
    email: body.email,
    role: "business"
  };
  const token = jwt.sign(user, config.jwtSecret, { expiresIn: "7d" });
  return {
    token,
    user
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
