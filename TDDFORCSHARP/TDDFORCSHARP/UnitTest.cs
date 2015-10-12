using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TDDFORCSHARP
{
    [TestClass]
    public class TestTemplate
    {
        [TestMethod]
        public void oneVarible()
        {
            Template template = new Template("Hello, ${name}");
            template.set("name", "Reader");
            Assert.AreEqual("Hello, Reader", template.evaluate());
        }

        [TestMethod]
        public void differentTemplate()
        {
            Template template = new Template("Hi, ${name}");
            template.set("name", "someone else");
            Assert.AreEqual("Hi, someone else", template.evaluate());
        }

        [TestMethod]
        public void multiplevariables()
        {
            Template template = new Template("${one}, ${two}, ${three}");
            template.set("one", "1");
            template.set("two", "2");
            template.set("three", "3");
            Assert.AreEqual("1, 2, 3", template.evaluate());
        }

        [TestMethod]
        public void unknownVariablesAreIgnored()
        {
            Template template = new Template("Hello, ${name}");
            template.set("name", "Reader");
            template.set("doesnotexist", "Hi");
            Assert.AreEqual("Hello, Reader", template.evaluate());
        }
    }
}
