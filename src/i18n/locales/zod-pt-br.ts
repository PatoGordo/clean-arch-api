import { ZodErrorMap, ZodIssueCode, util, ZodParsedType } from "zod";

const ptBrErrorMap: ZodErrorMap = (issue, _ctx) => {
  let message: string;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Obrigatório";
      } else {
        message = `Esperado ${issue.expected}, recebido ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Valor literal inválido, esperado ${JSON.stringify(
        issue.expected,
        util.jsonStringifyReplacer,
      )}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Chave(s) não reconhecida(s) no objeto: ${util.joinValues(
        issue.keys,
        ", ",
      )}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Entrada inválida`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Valor de discriminador inválido. Esperado ${util.joinValues(
        issue.options,
      )}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Valor de enumeração inválido. Esperado ${util.joinValues(
        issue.options,
      )}, recebido '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Argumentos de função inválidos`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Tipo de retorno de função inválido`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Data inválida`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Entrada inválida: deve incluir "${issue.validation.includes}"`;

          if (typeof issue.validation.position === "number") {
            message = `${message} em uma ou mais posições maiores ou iguais a ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Entrada inválida: deve começar com "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Entrada inválida: deve terminar com "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `String '${issue.validation}' é inválida`;
      } else {
        message = "Inválido";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array deve conter ${
          issue.exact
            ? "exatamente"
            : issue.inclusive
            ? `pelo menos`
            : `mais de`
        } ${issue.minimum} elemento(s)`;
      else if (issue.type === "string")
        message = `String deve conter ${
          issue.exact
            ? "exatamente"
            : issue.inclusive
            ? `pelo menos`
            : `mais de`
        } ${issue.minimum} caractere(s)`;
      else if (issue.type === "number")
        message = `Número deve ser ${
          issue.exact
            ? `exatamente igual a `
            : issue.inclusive
            ? `maior ou igual a `
            : `maior que `
        }${issue.minimum}`;
      else if (issue.type === "date")
        message = `Data deve ser ${
          issue.exact
            ? `exatamente igual a `
            : issue.inclusive
            ? `maior ou igual a `
            : `maior que `
        }${new Date(Number(issue.minimum))}`;
      else message = "Entrada inválida";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array deve conter ${
          issue.exact
            ? `exatamente`
            : issue.inclusive
            ? `no máximo`
            : `menos de`
        } ${issue.maximum} elemento(s)`;
      else if (issue.type === "string")
        message = `String deve conter ${
          issue.exact
            ? `exatamente`
            : issue.inclusive
            ? `no máximo`
            : `menos de`
        } ${issue.maximum} caractere(s)`;
      else if (issue.type === "number")
        message = `Número deve ser ${
          issue.exact
            ? `exatamente`
            : issue.inclusive
            ? `menor ou igual a`
            : `menor que`
        } ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt deve ser ${
          issue.exact
            ? `exatamente`
            : issue.inclusive
            ? `menor ou igual a`
            : `menor que`
        } ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Data deve ser ${
          issue.exact
            ? `exatamente`
            : issue.inclusive
            ? `menor ou igual a`
            : `menor que`
        } ${new Date(Number(issue.maximum))}`;
      else message = "Entrada inválida";
      break;
    case ZodIssueCode.custom:
      message = `Entrada inválida`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Os resultados da interseção não puderam ser mesclados`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Número deve ser um múltiplo de ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Número deve ser finito";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};

export default ptBrErrorMap;
