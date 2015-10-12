using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace TDDFORCSHARP
{
    class Template
    {
        private String templateText;

        private Hashtable variables;

        public Template(string templateText)
        {
            variables = new Hashtable();
            this.templateText = templateText;
        }

        public string evaluate()
        {
            string result = templateText;
            foreach (DictionaryEntry de in variables)
            {
                string regex = "${" + de.Key.ToString() + "}";
                result = result.Replace(regex, de.Value.ToString());
            }
            return result;
        }

        public void set(string name, string value)
        {
            variables.Add(name, value);
        }
    }
}
